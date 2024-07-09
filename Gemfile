# frozen_string_literal: true

source 'https://rubygems.org'

# From https://github.com/bundler/bundler/issues/4978#issuecomment-272248627
git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

gem 'rails'
gem 'rails-i18n'
gem 'i18n-js'
gem 'activerecord-import'
gem 'sass-rails'
gem "sassc-embedded"
gem 'terser'
gem 'faraday'
gem 'faraday-retry'
gem 'sdoc', group: :doc
gem 'dotenv-rails', require: 'dotenv/load'
gem 'seedbank'
gem 'jbuilder'
gem 'bootstrap-sass'
gem 'mail_form'
gem 'simple_form'
gem 'valid_email'
gem 'recaptcha', require: 'recaptcha/rails'
gem 'kaminari'
gem 'kaminari-i18n'
gem 'devise'
# NOTE: we put devise-18n before devise-bootstrap-views intentionally.
# See https://github.com/hisea/devise-bootstrap-views/issues/55 for more details.
gem 'devise-i18n'
gem 'devise-bootstrap-views'
gem 'devise-two-factor'
gem 'rqrcode'
gem 'doorkeeper'
gem 'doorkeeper-openid_connect'
gem 'doorkeeper-i18n'
gem 'strip_attributes'
gem 'time_will_tell', github: 'thewca/time_will_tell'
gem 'redcarpet'
gem 'bootstrap-table-rails'
gem 'money-rails'
gem 'octokit'
gem 'stripe'
gem 'oauth2'
gem 'openssl'
gem "vault"
gem 'wca_i18n'
gem 'cookies_eu'
gem 'superconfig'
gem 'eu_central_bank'
gem 'devise-jwt'
gem 'jwt'
gem 'iso', github: 'thewca/ruby-iso'

# Pointing to jfly/selectize-rails which has a workaround for
#  https://github.com/selectize/selectize.js/issues/953
gem 'selectize-rails', github: 'jfly/selectize-rails'

gem 'carrierwave'
gem 'carrierwave-aws'
gem 'aws-sdk-s3'
gem 'aws-sdk-rds'
gem 'aws-sdk-cloudfront'
gem 'aws-sdk-comprehend'

# Pointing to thewca/carrierwave-crop which has a workaround for
#  https://github.com/kirtithorat/carrierwave-crop/issues/17
#  and also remove jquery from dependencies (because we add it through webpack)
gem 'carrierwave-crop', github: 'thewca/carrierwave-crop'

gem 'redis'
# Faster Redis library
gem 'hiredis'
gem 'mini_magick'
gem 'mysql2'
gem 'premailer-rails'
gem 'nokogiri'
gem 'cocoon'
gem 'momentjs-rails', github: 'derekprior/momentjs-rails'
gem 'datetimepicker-rails', github: 'zpaulovics/datetimepicker-rails', submodules: true
gem 'blocks'
gem 'rack-cors', require: 'rack/cors'
gem 'api-pagination'
gem 'daemons'
gem 'i18n-country-translations', github: 'thewca/i18n-country-translations'
gem 'http_accept_language'
gem 'twitter_cldr'
# version explicitly specified because Shakapacker wants to keep Gemfile and package.json in sync
gem 'shakapacker', '8.0.0'
gem 'json-schema'
gem 'translighterate'
gem 'enum_help'
gem 'google-apis-admin_directory_v1'
gem 'activestorage-validator'
gem 'image_processing'
gem 'rest-client'
gem 'wicked_pdf'
gem 'icalendar'
# pointing to our fork which has Rails 7 support enabled (aka monkey-patched)
gem 'starburst', github: 'thewca/starburst'
gem 'react-rails'
gem 'sprockets-rails'
gem 'fuzzy-string-match'
gem 'sidekiq'
gem 'sidekiq-cron'
gem 'after_commit_everywhere'
gem 'slack-ruby-client'

group :development, :test do
  gem 'spring'
  gem 'spring-commands-rspec'
  gem 'rspec-rails'
  gem 'factory_bot_rails'
  gem 'faker'
  gem 'capybara-screenshot'

  gem 'byebug'
  gem 'i18n-tasks'
  gem 'i18n-spec'

  # We may be able to remove this when a future version of bundler comes out.
  # See https://github.com/bundler/bundler/issues/6929#issuecomment-459151506 and
  # https://github.com/bundler/bundler/pull/6963 for more information.
  gem 'irb', require: false
end

group :development do
  gem 'overcommit', require: false
  gem 'rubocop', require: false
  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'bullet'
  gem 'web-console'
end

group :test do
  gem 'rake' # As per http://docs.travis-ci.com/user/languages/ruby/
  gem 'rspec-retry'
  gem 'guard-rspec'
  gem 'launchy'
  gem 'capybara'
  gem 'oga' # XML parsing library introduced for testing RSS feed
  gem 'database_cleaner'
  gem 'rails-controller-testing'
  gem 'apparition', github: 'twalpole/apparition'
  gem 'simplecov', require: false
  gem 'simplecov-lcov', require: false
  gem 'timecop'
  gem 'webmock'
end

group :production do
  gem 'unicorn'
  gem 'newrelic_rpm'
  gem 'wkhtmltopdf-binary-ng'
end
