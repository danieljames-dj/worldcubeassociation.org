# frozen_string_literal: true

class ComputePotentialDuplicates < ApplicationJob
  def perform(job)
    persons_cache = Person.select(:id, :wca_id, :name, :dob, :country_id)

    # Find the previous job run for this competition (not the current one)
    previous_job = DuplicateCheckerJobRun.where(competition_id: job.competition_id).where.not(id: job.id).first

    job.touch(:start_time)
    job.update!(run_status: DuplicateCheckerJobRun.run_statuses[:in_progress])

    job.competition.accepted_newcomers.each do |user|
      cached_duplicates = cached_potential_duplicates(user, PotentialDuplicatePerson.name_matching_algorithms[:jarowinkler], previous_job)

      if cached_duplicates.present?
        # Reuse existing results - user hasn't changed since last computation
        cached_duplicates.each do |existing|
          PotentialDuplicatePerson.create!(
            duplicate_checker_job_run_id: job.id,
            original_user_id: user.id,
            duplicate_person_id: existing.duplicate_person_id,
            name_matching_algorithm: existing.name_matching_algorithm,
            score: existing.score,
          )
        end
      else
        # Compute fresh results
        similar_persons = FinishUnfinishedPersons.compute_similar_persons(user.name, user.country.id, persons_cache)

        similar_persons.each do |person, score_decimal|
          PotentialDuplicatePerson.create!(
            duplicate_checker_job_run_id: job.id,
            original_user_id: user.id,
            duplicate_person_id: person.id,
            name_matching_algorithm: PotentialDuplicatePerson.name_matching_algorithms[:jarowinkler],
            score: score_decimal * 100,
          )
        end
      end
    end

    job.touch(:end_time)
    job.update!(run_status: DuplicateCheckerJobRun.run_statuses[:success])
  end

  private

    # Returns cached potential duplicates for a user from the previous job run if all records
    # were created after the user was last updated. Returns nil if no previous job or cache is stale.
    def cached_potential_duplicates(user, algorithm, previous_job)
      return nil unless previous_job

      existing = PotentialDuplicatePerson.where(
        original_user_id: user.id,
        name_matching_algorithm: algorithm,
        duplicate_checker_job_run_id: previous_job.id
      )

      # If any record was created before the user was last updated, cache is stale
      return nil if existing.where(created_at: ...user.updated_at).exists?

      # TODO: Handle staleness of persons.

      existing.select(:duplicate_person_id, :name_matching_algorithm, :score)
    end
end
