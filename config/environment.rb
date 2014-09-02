require 'rubygems'
require 'bundler/setup'

require 'active_support/all'
require 'pry' if development?
# Load Sinatra Framework (with AR)
require 'sinatra'
require 'sinatra/activerecord'

require 'factory_girl'
require 'faker'

require './factories/post'
require 'rspec'
require 'rack/test'

require 'carrierwave'
require 'carrierwave/orm/activerecord'

require "sinatra/reloader"

require 'json'




RSpec.configure do |config|
  config.include FactoryGirl::Syntax::Methods
  config.include Rack::Test::Methods
end

APP_ROOT = Pathname.new(File.expand_path('../../', __FILE__))
APP_NAME = APP_ROOT.basename.to_s

# Sinatra configuration
configure do
  set :root, APP_ROOT.to_path
  set :server, :puma

  enable :sessions
  set :session_secret, ENV['SESSION_KEY'] || 'lighthouselabssecret'

  set :views, File.join(Sinatra::Application.root, "app", "views")
end

CarrierWave.configure do |config|
  # config.storage = :file
  # config.root = File.join(APP_ROOT,'public')
  # config.store_dir = File.join('uploads')
  config.permissions = 0666
  config.directory_permissions = 0777
  config.enable_processing = false
  config.root = "#{APP_ROOT}/public"
end

# Set up the database and models
require APP_ROOT.join('config', 'database')

# Load the routes / actions
require APP_ROOT.join('app', 'actions')
