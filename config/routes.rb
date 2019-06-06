Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "groups#index"
  resources :users, only: [:index, :edit, :update]
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
    namespace :api do
      resources :messages, only: :index, defaults: { format: 'json' }
    end
  end
end

resources :users do
  collection do
    get 'login'
    get 'signup'
    get 'user_registration'
    get 'sms_confirmation'
    get 'address_registration'
    get 'card_registration'
    get 'registration_complete'
  end
end
class UsersController < ApplicationController
  def login
  end
  def signup
  end
  def user_registration
  end
  def sms_confirmation
  end
  def address_registration
  end
  def card_registration
  end
  def registration_complete
  end
end