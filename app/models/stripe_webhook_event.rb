# frozen_string_literal: true

class StripeWebhookEvent < ApplicationRecord
  PAYMENT_INTENT_SUCCEEDED = 'payment_intent.succeeded'
  PAYMENT_INTENT_CANCELED = 'payment_intent.canceled'
  REFUND_CREATED = 'refund.created'
  REFUND_UPDATED = 'refund.updated'

  HANDLED_EVENTS = [
    PAYMENT_INTENT_SUCCEEDED,
    PAYMENT_INTENT_CANCELED,
    REFUND_CREATED,
    REFUND_UPDATED,
  ].freeze

  # Events that when listening to, may contain new (incoming) payloads
  #   that we did not yet know anything about
  INCOMING_EVENTS = [
    REFUND_CREATED,
    REFUND_UPDATED,
  ].freeze

  default_scope -> { handled }

  scope :handled, -> { where(handled: true) }

  belongs_to :stripe_record, optional: true

  has_one :confirmed_intent, class_name: "PaymentIntent", as: :confirmation_source
  has_one :canceled_intent, class_name: "PaymentIntent", as: :cancellation_source

  def retrieve_event
    stripe_client.v1.events.retrieve(self.stripe_id)
  end

  def self.create_from_api(api_event, handled: false)
    created_at_remote = Time.at(api_event.created).to_datetime

    StripeWebhookEvent.create!(
      stripe_id: api_event.id,
      event_type: api_event.type,
      account_id: api_event.account,
      created_at_remote: created_at_remote,
      handled: handled,
    )
  end

  private def stripe_client
    Stripe::StripeClient.new(AppSecrets.STRIPE_API_KEY, stripe_account: self.account_id)
  end
end
