# frozen_string_literal: true

after :user_groups do
  board_group = UserGroup.find_by!(group_type: :board)

  # Past board roles
  9.times.collect do |index|
    UserRole.create!(
      user: FactoryBot.create(:user_with_wca_id),
      group: board_group,
      start_date: Faker::Date.between(from: 10.years.ago, to: 5.years.ago),
      end_date: Faker::Date.between(from: 5.years.ago, to: Date.today),
    )
  end

  # Current board roles
  4.times.collect do |index|
    UserRole.create!(
      user: FactoryBot.create(:user_with_wca_id),
      group: board_group,
      start_date: Faker::Date.between(from: 10.years.ago, to: 5.years.ago),
    )
  end
end
