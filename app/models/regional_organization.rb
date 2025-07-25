# frozen_string_literal: true

class RegionalOrganization < ApplicationRecord
  has_one_attached :logo
  has_one_attached :bylaws
  has_one_attached :extra_file

  scope :currently_acknowledged, -> { where("start_date IS NOT NULL AND (end_date IS NULL OR end_date > ?)", Date.today) }
  scope :pending_approval, -> { where(start_date: nil) }
  scope :previously_acknowledged, -> { where("start_date IS NOT NULL AND end_date IS NOT NULL AND end_date < ?", Date.today) }

  validates :name, :country, :email, :address, :directors_and_officers, :area_description, :past_and_current_activities, :future_plans, presence: true
  validates :website, presence: true, format: { with: %r{\Ahttps?://.*\z} }
  validates :logo, presence: true, blob: { content_type: 'image/png', size_range: 0..(200.kilobytes) }
  validates :bylaws, presence: true, blob: { content_type: 'application/pdf', size_range: 0..(250.kilobytes) }
  validates :extra_file, blob: { content_type: 'application/pdf', size_range: 0..(200.kilobytes) }

  validate :validate_email
  def validate_email
    errors.add(:email, I18n.t('common.errors.invalid')) unless ValidateEmail.valid?(email)
  end

  validate :start_date_must_be_earlier_than_end_date
  def start_date_must_be_earlier_than_end_date
    errors.add(:start_date, I18n.t('regional_organizations.errors.end_date_after_start_date')) if start_date && end_date && start_date >= end_date
  end

  def pending?
    start_date.nil?
  end

  def logo_url
    Rails.application.routes.url_helpers.rails_representation_url(logo.variant(resize: "500x300").processed) if logo.attached?
  end

  def country_iso2
    # Have to use this weird [] notation because ROs have a column called `country` which should be `country_id`
    Country.c_find(self[:country])&.iso2
  end

  DEFAULT_SERIALIZE_OPTIONS = {
    only: %w[name website country],
    methods: ["logo_url"],
  }.freeze

  def serializable_hash(options = nil)
    super(DEFAULT_SERIALIZE_OPTIONS.merge(options || {}))
  end
end
