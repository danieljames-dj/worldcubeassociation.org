# frozen_string_literal: true

require 'fileutils'

class ResultsSubmissionController < ApplicationController
  before_action :authenticate_user!
  before_action -> { redirect_to_root_unless_user(:can_upload_competition_results?, competition_from_params) }, except: %i[newcomer_checks last_duplicate_checker_job_run compute_potential_duplicates]
  before_action -> { redirect_to_root_unless_user(:can_check_newcomers_data?, competition_from_params) }, only: %i[newcomer_checks last_duplicate_checker_job_run compute_potential_duplicates]

  def new
    @competition = competition_from_params
    @results_validator = ResultsValidators::CompetitionsResultsValidator.create_full_validation
    @results_validator.validate(@competition.id)
  end

  def newcomer_checks
    @competition = competition_from_params
  end

  def last_duplicate_checker_job_run
    last_job_run = DuplicateCheckerJobRun.find_by(competition_id: params.require(:competition_id))

    render status: :ok, json: last_job_run
  end

  def compute_potential_duplicates
    job_run = DuplicateCheckerJobRun.create!(competition_id: params.require(:competition_id))
    ComputePotentialDuplicates.perform_later(job_run)

    render status: :ok, json: job_run
  end

  def upload_json
    competition = competition_from_params(associations: { competition_events: [:rounds] })

    # Only admins can upload results for the competitions where results are already submitted.
    if competition.results_submitted? && !current_user.can_admin_results?
      return render status: :unprocessable_entity, json: {
        error: "Results have already been submitted for this competition.",
      }
    end

    # Do json analysis + insert record in db, then redirect to check inbox
    # (and delete existing record if any)
    results_file = params.require(:results_file)
    results_json_str = results_file.read
    results_file.rewind
    parsed_json = JSON.parse(results_json_str)
    errors = []

    begin
      # Parse the json first
      JSON::Validator.validate!(ResultsValidators::JSONSchemas::RESULT_JSON_SCHEMA, parsed_json)
      errors << "Result file is not for this competition but for #{parsed_json['competitionId']}!" if parsed_json["competitionId"] != competition.id
    rescue JSON::ParserError
      errors << "Result file must be a JSON file from the Workbook Assistant"
    rescue JSON::Schema::ValidationError => e
      errors << "Result file has errors: #{e.message}"
    end

    persons_to_import = []
    parsed_json["persons"].each do |p|
      new_person_attributes = {
        id: p["id"],
        wca_id: p["wcaId"],
        competition_id: competition_id,
        name: p["name"],
        country_iso2: p["countryId"],
        gender: p["gender"],
        dob: p["dob"],
      }
      # mask uploaded DOB on staging to avoid accidentally importing PII
      new_person_attributes["dob"] = "1954-12-04" if Rails.env.production? && !EnvConfig.WCA_LIVE_SITE?
      persons_to_import << InboxPerson.new(new_person_attributes)
    end
    results_to_import = []
    scrambles_to_import = []
    parsed_json["events"].each do |event|
      competition_event = competition.competition_events.find { |ce| ce.event_id == event["eventId"] }
      event["rounds"].each do |round|
        # Find the corresponding competition round and get the actual round_type_id
        # (in case the incoming one doesn't correspond to cutoff presence).
        incoming_round_type_id = round["roundId"]
        competition_round = competition_event.rounds.find do |cr|
          [incoming_round_type_id, RoundType.toggle_cutoff(incoming_round_type_id)].include?(cr.round_type_id)
        end
        round_type_id = competition_round&.round_type_id || incoming_round_type_id

        # Import results for round
        round["results"].each do |result|
          individual_results = result["results"]
          # Pad the results with 0 up to 5 results
          individual_results.fill(0, individual_results.length...5)
          new_result_attributes = {
            person_id: result["personId"],
            pos: result["position"],
            event_id: event["eventId"],
            round_type_id: round_type_id,
            round_id: competition_round&.id,
            format_id: round["formatId"],
            best: result["best"],
            average: result["average"],
            value1: individual_results[0],
            value2: individual_results[1],
            value3: individual_results[2],
            value4: individual_results[3],
            value5: individual_results[4],
          }
          new_res = InboxResult.new(new_result_attributes)
          # Using this way of setting the attribute saves one SELECT per result
          # to validate the competition presence.
          # (a lot of time considering all the results to import!)
          new_res.competition = competition
          results_to_import << new_res
        end

        # Import scrambles for round
        round["groups"].each do |group|
          %w[scrambles extraScrambles].each do |scramble_type|
            group[scramble_type]&.each_with_index do |scramble, index|
              new_scramble_attributes = {
                competition_id: competition_id,
                event_id: event["eventId"],
                round_type_id: round_type_id,
                round_id: competition_round&.id,
                group_id: group["group"],
                is_extra: scramble_type == "extraScrambles",
                scramble_num: index + 1,
                scramble: scramble,
              }
              scrambles_to_import << Scramble.new(new_scramble_attributes)
            end
          end
        end
      end
    end

    return render status: :unprocessable_entity, json: { error: errors } if errors.count.positive?

    import_results(competition, persons_to_import, scrambles_to_import, results_to_import, results_json_str)
  end

  def import_from_live
    competition = competition_from_params

    # Only admins can upload results for the competitions where results are already submitted.
    if competition.results_submitted? && !current_user.can_admin_results?
      return render status: :unprocessable_entity, json: {
        error: "Results have already been submitted for this competition.",
      }
    end

    results_to_import = competition.rounds.flat_map do |round|
      round.round_results.map do |result|
        InboxResult.new({
                          competition: competition,
                          person_id: result.person_id,
                          pos: result.ranking,
                          event_id: round.event_id,
                          round_type_id: round.round_type_id,
                          round_id: round.id,
                          format_id: round.format_id,
                          best: result.best,
                          average: result.average,
                          value1: result.attempts[0].result,
                          value2: result.attempts[1]&.result || 0,
                          value3: result.attempts[2]&.result || 0,
                          value4: result.attempts[3]&.result || 0,
                          value5: result.attempts[4]&.result || 0,
                        })
      end
    end

    person_with_results = results_to_import.map(&:person_id).uniq

    persons_to_import = competition.registrations
                                   .includes(:user)
                                   .select { it.wcif_status == "accepted" && person_with_results.include?(it.registrant_id.to_s) }
                                   .map do
      InboxPerson.new({
                        id: it.registrant_id,
                        wca_id: it.wca_id || '',
                        competition_id: competition.id,
                        name: it.name,
                        country_iso2: it.country.iso2,
                        gender: it.gender,
                        dob: it.dob,
                      })
    end

    scrambles_to_import = InboxScrambleSet.where(competition_id: competition.id).flat_map do |scramble_set|
      scramble_set.inbox_scrambles.map do |scramble|
        Scramble.new({
                       competition_id: competition.id,
                       event_id: scramble_set.event_id,
                       round_type_id: scramble_set.round_type_id,
                       round_id: scramble_set.matched_round_id,
                       group_id: scramble_set.alphabetic_group_index,
                       is_extra: scramble.is_extra,
                       scramble_num: scramble.ordered_index + 1,
                       scramble: scramble.scramble_string,
                     })
      end
    end

    import_results(competition, persons_to_import, scrambles_to_import, results_to_import, nil)
  end

  def create
    competition = competition_from_params
    message = params.require(:message)
    results_validator = ResultsValidators::CompetitionsResultsValidator.create_full_validation.validate(competition.id)

    render status: :unprocessable_entity, json: { error: "Submitted results contain errors." } if results_validator.any_errors?

    CompetitionsMailer.results_submitted(competition, results_validator, message, current_user).deliver_now
    competition.touch(:results_submitted_at)

    render status: :ok, json: { success: true }
  end

  private def competition_from_params(associations: {})
    Competition.includes(associations).find(params[:competition_id])
  end

  private def import_results(competition, persons_to_import, scrambles_to_import, results_to_import, results_json_str)
    errors = []

    begin
      ActiveRecord::Base.transaction do
        InboxPerson.where(competition_id: competition.id).delete_all
        InboxResult.where(competition_id: competition.id).delete_all
        Scramble.where(competition_id: competition.id).delete_all
        InboxPerson.import!(persons_to_import)
        Scramble.import!(scrambles_to_import)
        InboxResult.import!(results_to_import)
      end
    rescue ActiveRecord::RecordNotUnique
      errors << "Duplicate record found while uploading results. Maybe there is a duplicate personId in the JSON?"
    rescue ActiveRecord::RecordInvalid => e
      object = e.record
      errors << if object.instance_of?(Scramble)
                  "Scramble in '#{Round.name_from_attributes_id(object.event_id, object.round_type_id)}' is invalid (#{e.message}), please fix it!"
                elsif object.instance_of?(InboxPerson)
                  "Person #{object.name} is invalid (#{e.message}), please fix it!"
                elsif object.instance_of?(InboxResult)
                  "Result for person #{object.person_id} in '#{Round.name_from_attributes_id(object.event_id, object.round_type_id)}' is invalid (#{e.message}), please fix it!"
                else
                  "An invalid record prevented the results from being created: #{e.message}"
                end
    end

    return render status: :unprocessable_entity, json: { error: errors } if errors.any?

    competition.touch(:results_submitted_at) if !competition.results_submitted? && params[:mark_result_submitted] && ActiveRecord::Type::Boolean.new.cast(params.require(:mark_result_submitted))

    competition.uploaded_jsons.create!(json_str: results_json_str) if results_json_str.present? && params[:store_uploaded_json] && ActiveRecord::Type::Boolean.new.cast(params.require(:store_uploaded_json))

    render status: :ok, json: { success: true }
  end
end
