# frozen_string_literal: true

class GroupsMetadataDelegateRegions < ApplicationRecord
  has_one :user_group, as: :metadata
  has_many :roles, through: :user_group
  has_many :roles_metadata_delegate_regions, through: :roles, source: :metadata, source_type: "RolesMetadataDelegateRegions"
  has_many :lead_roles, -> { where(status: RolesMetadataDelegateRegions.statuses[:senior_delegate]) }, class_name: "RolesMetadataDelegateRegions", through: :roles, source: :metadata, source_type: "RolesMetadataDelegateRegions"

  def email
    super || "delegates.#{friendly_id}@worldcubeassociation.org"
  end
end
