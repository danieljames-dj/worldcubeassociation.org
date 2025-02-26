# frozen_string_literal: true

class Accounts::RegistrationsController < Devise::RegistrationsController
  before_action :check_captcha, only: [:create]
  protected def after_update_path_for(resource)
    edit_user_registration_path
  end

  private

    def check_captcha
      return
      return if verify_recaptcha

      build_resource(sign_up_params)
      resource.validate

      clean_up_passwords resource
      set_minimum_password_length

      respond_with_navigational(resource) do
        flash.now[:recaptcha_error] = flash[:recaptcha_error]
        render :new
      end
    end

    def after_sign_up_path_for(resource)
      puts('DJDJDJDJ start')
      puts(params)
      puts('DJDJDJDJ end')
      # if params[:terms_of_service] == '1'
      #   # Redirect to a specific URL if terms are accepted
      #   specific_path_for_accepted_terms_path
      # else
      #   # Redirect to a different URL if terms are not accepted
      #   specific_path_for_rejected_terms_path
      # end
      default_path
    end
end
