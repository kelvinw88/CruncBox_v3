require './config/environment.rb'


describe VoteController do

  subject(:post_1) {FactoryGirl.build :post,id: 1, status: 'sober', updated_at: '2014-08-01 01:45:17 UTC'}


  describe "POST /post/:post_id/upvote" do
    it "will be able to upvote" do


    it "can only upvote once only"
    it "changes the updated time of 'the post'"
  end


end
