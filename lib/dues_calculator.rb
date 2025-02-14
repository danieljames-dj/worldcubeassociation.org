# frozen_string_literal: true

module DuesCalculator
  def self.dues_per_competitor(country_iso2, base_entry_fee_lowest_denomination, currency_code)
    dues_per_competitor_in_usd_money = dues_per_competitor_in_usd(country_iso2, base_entry_fee_lowest_denomination, currency_code)
    dues_per_competitor_in_usd_money&.exchange_to(currency_code)
  rescue CurrencyUnavailable
    nil
  end

  def self.dues_per_competitor_in_usd(country_iso2, base_entry_fee_lowest_denomination, currency_code)
    country_band = CountryBand.find_by(iso2: country_iso2)&.number

    input_money_us_dollars = Money.new(base_entry_fee_lowest_denomination, currency_code).exchange_to("USD")

    registration_fee_dues_us_dollars = input_money_us_dollars * CountryBand.percent_registration_fee_used_for_due_amount(country_band)
    country_band_dues_us_dollars = country_band.present? && country_band > 0 ? CountryBand::BANDS[country_band][:value] : 0
    # times 100 because Money require lowest currency subunit, which is cents for USD
    country_band_dues_us_dollars_money = Money.new(country_band_dues_us_dollars * 100, "USD")

    [registration_fee_dues_us_dollars, country_band_dues_us_dollars_money].max
  rescue Money::Currency::UnknownCurrency, CurrencyUnavailable
    nil
  end
end
