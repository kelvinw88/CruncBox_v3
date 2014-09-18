require './config/environment.rb'

describe Post do

  before(:each) do
    Post.destroy_all
  end

  subject!(:post_1) {FactoryGirl.create :post, status: 'sober', updated_at: 2.days.ago.to_date}
  let!(:post_2) {FactoryGirl.create :post, status: 'drunk', updated_at: 2.days.ago.to_date}
  let!(:post_3) {FactoryGirl.create :post, status: 'high', updated_at: 13.days.from_now.to_date}
  let!(:post_4) {FactoryGirl.create :post, status: 'sober', updated_at: 13.days.from_now.to_date}

  it "should show all alive posts" do
    Post.alive.should == [post_3,post_4]
  end

  it "should show all drunk posts in order that is still alive" do
    Post.drunk.should == []
  end

  it "should show all sober posts in order that is still alive" do
    Post.sober.should == [post_4]
  end

  it "high show all high posts in order that is still alive" do
    Post.high.should == [post_3]
  end

end
