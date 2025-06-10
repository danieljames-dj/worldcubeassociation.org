# frozen_string_literal: true

class AddChangeTypeToTicketsEditPerson < ActiveRecord::Migration[7.2]
  def change
    add_column :tickets_edit_person, :change_type, :string
  end
end
