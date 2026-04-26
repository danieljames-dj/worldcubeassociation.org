# frozen_string_literal: true

FactoryBot.define do
  factory :duplicate_checker_job_run do
    association :competition
    run_status { :not_started }
  end
end
