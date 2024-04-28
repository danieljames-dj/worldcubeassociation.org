# frozen_string_literal: true

class Api::V0::Wfc::XeroApiController < Api::V0::ApiController
  include XeroRuby

  before_action :current_user_can_admin_finances!
  private def current_user_can_admin_finances!
    unless current_user.can_admin_finances?
      render json: {}, status: 401
    end
  end

  CREDENTIALS = {
    client_id: "BDD44C6A7DA842CA9B45435B5B88B68A",
    client_secret: "mFSSTXKJXM456tGMbVnteYEg96W6_aSR2whmSS_HDmsIP2IR",
    redirect_uri: 'http://localhost:3000/panel/wfc',
    scopes: "openid profile email accounting.transactions accounting.contacts",
  }.freeze

  def authorize_xero
    config = { timeout: 30, debugging: true }
    @@xero_client ||= XeroRuby::ApiClient.new(credentials: CREDENTIALS, config: config)
    @authorization_url = @@xero_client.authorization_url
    redirect_to @authorization_url, allow_other_host: true
  end

  def token_set_from_callback
    unless params['code']
      return render json: { success: false }
    end

    # config = { timeout: 30, debugging: true }
    # @@xero_client ||= XeroRuby::ApiClient.new(credentials: CREDENTIALS, config: config)
    token_params = {}
    token_params["code"] = params.require(:code)
    token_params["scope"] = params.require(:scope)
    token_set = @@xero_client.get_token_set_from_callback(token_params)
    @@xero_client.set_token_set(token_set)
    tenant_id = @@xero_client.last_connection
    @@xero_client.disconnect(tenant_id)
    render json: { success: true }
    # contacts = { "Contacts": [{ "Name": "Daniel Abcd" }]}
    # contacts = { "Contacts": [ { "ContactID": "3ff6d40c-af9a-40a3-89ce-3c1556a25591", "ContactStatus": "ACTIVE", "Name": "Foo9987", "EmailAddress": "sid32476@blah.com", "BankAccountDetails": "", "Addresses": [ { "AddressType": "STREET", "City": "", "Region": "", "PostalCode": "", "Country": "" }, { "AddressType": "POBOX", "City": "", "Region": "", "PostalCode": "", "Country": "" } ], "Phones": [ { "PhoneType": "DEFAULT", "PhoneNumber": "", "PhoneAreaCode": "", "PhoneCountryCode": "" }, { "PhoneType": "DDI", "PhoneNumber": "", "PhoneAreaCode": "", "PhoneCountryCode": "" }, { "PhoneType": "FAX", "PhoneNumber": "", "PhoneAreaCode": "", "PhoneCountryCode": "" }, { "PhoneType": "MOBILE", "PhoneNumber": "555-1212", "PhoneAreaCode": "415", "PhoneCountryCode": "" } ], "UpdatedDateUTC": "/Date(1551399321043+0000)/", "ContactGroups": [], "IsSupplier": false, "IsCustomer": false, "SalesTrackingCategories": [], "PurchasesTrackingCategories": [], "PaymentTerms": { "Bills": { "Day": 15, "Type": "OFCURRENTMONTH" }, "Sales": { "Day": 10, "Type": "DAYSAFTERBILLMONTH" } }, "ContactPersons": [] } ] } # Contacts | Contacts with an array of Contact objects to create in body of request
    # contacts = XeroRuby::Accounting::Contacts.new(contacts:
    # [
    #   XeroRuby::Accounting::Contact.new(name: 'Daniel Abcd'),
    # ])
    # opts = {
    #   summarize_errors: false, # Boolean | If false return 200 OK and mix of successfully created objects and any with validation errors
    #   idempotency_key: 'KEY_VALUE' # String | This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
    # }
    # @invoices = @@xero_client.accounting_api.get_invoices(tenant_id).invoices
    # # @@xero_client.accounting_api.create_contacts(tenant_id, contacts, opts)
    # @@xero_client.disconnect(tenant_id)
    # render json: { token_set: token_set, invoices: @invoices }
  end

  def create_contacts
    # token_set = params.require(:tokenSet)
    # config = { timeout: 30, debugging: true }
    # @@xero_client ||= XeroRuby::ApiClient.new(credentials: CREDENTIALS, config: config)
    # puts('DJDJ')
    # puts(token_set)
    # puts('DJDJ')
    # @@xero_client.set_token_set(token_set)
    # tenant_id = @@xero_client.last_connection
    # contact_params = {}
    # contact_params['Contacts'] = [
    #   { Name: "Daniel Abcd" },
    # ]
    # @@xero_client.accounting_api.create_contacts(tenant_id, contact_params)
    # @@xero_client.disconnect(tenant_id)
  end
end
