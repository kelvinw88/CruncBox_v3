require './config/environment.rb'

describe Post do

  subject(:post_3) {Post.new(status: 'high', content: 'I am so high', updated_at: '2014-08-09 01:45:17 UTC')}
  let(:post_1) {Post.new(status: 'drunk', content: 'I am so Drunk', updated_at: '2014-08-01 01:45:17 UTC')}
  let(:post_2) {Post.new(status: 'sober', content: 'I am so sober', updated_at: '2014-08-07 01:45:17 UTC')}

  it "should show all post in order" do
  Post.all.should == [@post_newest, @post]
  end

  it "should show all drunk post in order" do
  Post.drunk.should == [@post_newest, @post]
  end

  it "should show all sober post in order" do
  Post.sober.should == [@post_newest, @post]
  end

  it "high show all high post in order" do
  Post.high.should == [@post_newest, @post]
  end

end
