require './config/environment.rb'

describe Post do

  subject(:post) {Post.new}

  describe '#status' do
    it "is required" do
      post.status = nil
      post.should_not be_valid
      expect(post.errors[:status]).to include "can't be blank"
    end
  end

  describe '#content' do

    it "must not be blank" do
      post.content = nil
      post.should_not be_valid
      post.errors[:content].should == ["can't be blank", "is too short (minimum is 3 characters)"]
    end

    it "must be longer than 2 letters" do
      post.content = "ll"
      post.should_not be_valid
      post.errors[:content].should == ["is too short (minimum is 3 characters)"]
    end

    it "must be longer than 144 letters" do
      post.content = "llllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll22222"
      post.should_not be_valid
      post.errors[:content].should == ["is too long (maximum is 144 characters)"]
    end
  end
end

describe Comment do

  subject(:comment) {Comment.new}

  describe '#content' do
    it "must not be blank" do
      comment.content = nil
      comment.should_not be_valid
      comment.errors[:content].should == ["can't be blank", "is too short (minimum is 3 characters)"]
    end

    it "must be longer than 144 letters" do
      comment.content = "llllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll22222"
      comment.should_not be_valid
      comment.errors[:content].should == ["is too long (maximum is 144 characters)"]
    end

  end

end
