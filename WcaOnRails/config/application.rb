# frozen_string_literal: true

require_relative 'boot'
require_relative 'locales/locales'
require_relative '../lib/middlewares/fix_accept_header'
require_relative '../lib/middlewares/warden_user_logger'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)
require_relative '../env_config'
require_relative '../app_secrets'

module WcaOnRails
  BOOTED_AT = Time.now

  class Application < Rails::Application
    XERO_CLIENT_ID = "618EC1DC42424075A2B7DBEBF42A86F5"
    XERO_CLIENT_SECRET = "ut0mOpuXq0GCalYc2npVv9JIFvyydWv8TPWCN6BJo8ZGMaYS"

    CREDENTIALS = {
      client_id: XERO_CLIENT_ID,
      client_secret: XERO_CLIENT_SECRET,
      grant_type: 'client_credentials',
    }.freeze
    xero_client = XeroRuby::ApiClient.new(credentials: CREDENTIALS)
    # token_set = xero_client.get_client_credentials_token
    contacts = xero_client.accounting_api.get_contacts('').contacts
    # xero_client.refresh_token_set(token_set)
    # tenant_id = xero_client.last_connection
    # if_modified_since = "2020-02-06T12:17:43.202-08:00"
    # where = 'ContactStatus==#{XeroRuby::Accounting::Contact::ACTIVE}'
    # order = 'Name ASC'
    # ids = ["00000000-0000-0000-0000-000000000000"]
    # page = 1
    # include_archived = true
    # summary_only = true
    # search_term = 'Joe Bloggs'
    # response = xero_client.accounting_api.get_contacts('', {
    #   if_modified_since: if_modified_since,
    #   # where: where,
    #   order: order,
    #   ids: ids,
    #   page: page,
    #   include_archived: include_archived,
    #   summary_only: summary_only,
    #   search_term: search_term,
    # })
    puts('DJDJDJ')
    puts(contacts)
    puts('DJDJDJ')

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de

    config.load_defaults 7.0

    config.active_job.queue_adapter = :sidekiq

    config.generators do |g|
      g.test_framework(
        :rspec,
        fixtures: true,
        view_specs: false,
        helper_specs: false,
        routing_specs: false,
        controller_specs: true,
        request_specs: true,
      )
      g.fixture_replacement :factory_girl, dir: "spec/factories"
    end

    config.default_from_address = "notifications@worldcubeassociation.org"
    config.site_name = "World Cube Association"

    config.middleware.insert_before 0, Rack::Cors, debug: false, logger: (-> { Rails.logger }) do
      allow do
        origins '*'

        resource(
          '/api/*',
          headers: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
          methods: [:get, :post, :delete, :put, :patch, :options, :head],
          expose: ['Total', 'Per-Page', 'Link'],
          max_age: 0,
          credentials: false,
        )
      end
    end

    # Setup available locales
    I18n.available_locales = Locales::AVAILABLE.keys

    # Enable locale fallbacks for I18n (makes lookups for any locale fall back to
    # the I18n.default_locale when a translation cannot be found).
    config.i18n.fallbacks = [:en]

    config.middleware.use Middlewares::FixAcceptHeader
    config.middleware.use Middlewares::WardenUserLogger, logger: ->(s) { Rails.logger.info(s) }

    config.autoload_paths << Rails.root.join('lib')
    config.eager_load_paths << Rails.root.join('lib')

    # Set global default_url_options, see https://github.com/rails/rails/issues/29992#issuecomment-761892658
    root_url = URI.parse(EnvConfig.ROOT_URL)
    routes.default_url_options = {
      protocol: root_url.scheme,
      host: root_url.host,
      port: root_url.port,
    }

    config.action_view.preload_links_header = false
    config.active_storage.variant_processor = :mini_magick

    # Move the mailers into a separate queue for us to control
    config.action_mailer.deliver_later_queue_name = :mailers

    # Activate ActiveRecord attribute encryption for use with the Devise 2FA gem
    config.active_record.encryption.primary_key = AppSecrets.ACTIVERECORD_PRIMARY_KEY
    config.active_record.encryption.deterministic_key = AppSecrets.ACTIVERECORD_DETERMINISTIC_KEY
    config.active_record.encryption.key_derivation_salt = AppSecrets.ACTIVERECORD_KEY_DERIVATION_SALT

    config.active_record.encryption.hash_digest_class = OpenSSL::Digest::SHA256
  end
end
