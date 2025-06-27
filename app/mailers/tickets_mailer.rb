# frozen_string_literal: true

class TicketsMailer < ApplicationMailer
  def notify_create_ticket_comment(ticket_comment, recipient_emails)
    @ticket_comment = ticket_comment

    mail(
      bcc: recipient_emails,
      subject: "[Ticket #{ticket_comment.ticket.id}] New comment added",
    )
  end

  def notify_log(ticket_log)
    stakeholders = ticket_log.ticket.ticket_stakeholders.map(&:stakeholder)
    recipient_emails = stakeholders.map(&:email)

    mail(
      bcc: recipient_emails,
      subject: "[Ticket #{ticket_comment.ticket.id}] New comment added",
    )
  end
end
