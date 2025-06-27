# frozen_string_literal: true

class TicketLog < ApplicationRecord
  enum :action_type, {
    status_updated: "status_updated",
  }
  belongs_to :ticket

  after_create :notify_stakeholders
  private def notify_stakeholders
    TicketsMailer.notify_log(self).deliver_later
  end
end
