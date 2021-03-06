
require './config/environment.rb'
require 'rack/test'


set :enviroment, :test

def app
  Sinatra::Application
end

  describe "GET index" do
    include Rack::Test::Methods

    before(:each) do
      Post.destroy_all
    end

    subject!(:post_1) {FactoryGirl.create :post, status: 'sober', updated_at: 2.days.ago.to_date}
    let!(:post_2) {FactoryGirl.create :post, status: 'drunk', updated_at: 2.days.ago.to_date}
    let!(:post_3) {FactoryGirl.create :post, status: 'high', updated_at: 13.days.from_now.to_date}
    let!(:post_4) {FactoryGirl.create :post, status: 'sober', updated_at: 13.days.from_now.to_date}


    it "gets only alive posts" do
      get '/'
      last_response.should be_ok
      last_response.body.scan(/2014.*UTC/).each do |date_str|
        expect(Time.parse(date_str)).to be > Time.now
      end
    end
  end


  describe "GET '/post/new/:status'" do
    it 'gets the form to make a new post'
    it "renders the :post/new"
  end

  describe "POST '/post'" do
    it 'post a new post'
    it 'redirect to "/" if success'
    it 'renders :post/new/:status if failed'
  end

  describe "GET '/post/:status'" do
    it 'sorts drunk post'
    it 'sorts high post'
    it 'sorts sober post'
    it 'redners :index'
  end

  describe "GET '/post/:id/show' " do
    it "gets a certain post in a page"
    it 'renders :post/show'
  end
