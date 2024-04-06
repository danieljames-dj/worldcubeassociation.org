# frozen_string_literal: true

after :user_groups do
  board_group = UserGroup.find_by!(group_type: :board)

  # def generate_wca_id
  #   mid = ('A'..'Z').to_a.sample(4).join
  #   id = "2016#{mid}01"
  #   id = id.next while Person.exists?(wca_id: id)
  #   id
  # end

  # def create_user(with_wca_id)
  #   name = Faker::Name.name
  #   country = Country.real.sample

  #   User.create!(
  #     name: name,
  #     email: Faker::Internet.email,
  #     country_iso2: country.iso2,
  #     gender: "m",
  #     dob: Date.new(1980, 1, 1),
  #     password: "wca",
  #     password_confirmation: "wca",
  #     cookies_acknowledged: true,
  #     person: with_wca_id ? Person.create!(
  #       wca_id: generate_wca_id,
  #       subId: 1,
  #       name: name,
  #       countryId: country.id,
  #       gender: "m",
  #       dob: '1980-01-01',
  #     ) : nil
  #   )
  # end

  # Past board roles
  9.times.collect do |index|
    wca_id_needed = index < 7 # Creates 2 board users without wca_id
    UserRole.create!(
      user: wca_id_needed ? FactoryBot.create(:user_with_wca_id) : FactoryBot.create(:user),
      group: board_group,
      start_date: Faker::Date.between(from: 10.years.ago, to: 5.years.ago),
      end_date: Faker::Date.between(from: 5.years.ago, to: Date.today),
    )
  end

  # Current board roles
  4.times.collect do |index|
    wca_id_needed = index < 3 # Creates 1 board user without wca_id
    UserRole.create!(
      user: wca_id_needed ? FactoryBot.create(:user_with_wca_id) : FactoryBot.create(:user),
      group: board_group,
      start_date: Faker::Date.between(from: 10.years.ago, to: 5.years.ago),
    )
  end
end
