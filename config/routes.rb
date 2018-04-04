# frozen_string_literal: true

require File.join(File.dirname(__FILE__), 'routes/active_investigations_constraint')
require File.join(File.dirname(__FILE__), 'routes/active_screenings_constraint')

Rails.application.routes.draw do
  root 'home#index'

  resources :screenings,
    only: %i[edit show],
    to: 'home#index'

  resources :investigations,
    only: [:show],
    to: 'home#index' do
    resources :contacts, only: %i[new show edit], to: 'home#index'
  end

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      get '/security/check_permission' => 'security#check_permission'
      get '/user_info' => 'user#user_info'

      resources :screenings,
        only: %i[index update show create],
        constraints: Routes::ActiveScreeningsConstraint do
        member do
          get 'history_of_involvements'
          get 'relationships' => 'relationships#by_screening_id'
          post 'submit'
        end
      end

      resources :participants, only: %i[create destroy]
      resources :participants,
        only: %i[update],
        constraints: Routes::ActiveScreeningsConstraint

      resources :relationships, only: %i[index]
      get :history_of_involvements, to: 'history_of_involvements#by_client_ids'

      resource :people, only: %i[search] do
        collection do
          get 'search'
        end
      end
      get 'people/:id', to: 'people#show'

      resources :investigations,
        only: %i[show],
        constraints: Routes::ActiveInvestigationsConstraint do
        resources :contacts, only: %i[create show update], module: :investigations
      end

      resources :system_codes,
        only: [:index]
      get 'cross_report_agency/:county_id', to: 'system_codes#cross_report_agency'
    end
  end

  resources :version, only: :index
  get '/logout' => 'home#logout'
  get '/snapshot' => 'home#index'

  get '*path', to: 'home#index', constraints: ->(request) { request.format.html? }
end
