# frozen_string_literal: true

# CA Intake Application Controller.
class ApplicationController < ActionController::Base # :nodoc:
  before_action :set_cache_headers
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  private

  def authenticate_user
    session.delete(:security_token) if security_token
    return if session[:security_token]

    process_token(security_token)
  end

  def process_token(security_token)
    auth_artifact = SecurityRepository.auth_artifact_for_token(security_token)
    if auth_artifact
      session[:security_token] = security_token
      return unless json?(auth_artifact)
      staff_id = JSON.parse(auth_artifact)['staffId']
      return unless staff_id
      session[:user_details] = StaffRepository.find(security_token, staff_id)
    else
      redirect_to SecurityRepository.login_url(request.original_url)
    end
  end

  def security_token
    params[:token]
  end

  def authentication_enabled?
    Feature.active?(:authentication)
  end

  def set_cache_headers
    response.headers['Cache-Control'] = 'no-cache, no-store'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '0'
    response.headers['X-Frame-Options'] = 'DENY'
    response.headers['X-XSS-Protection'] = '1'
  end

  def json?(json_candidate)
    JSON.parse(json_candidate)
    true
  rescue
    false
  end
end
