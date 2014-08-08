require './config/environment.rb'

describe Post do

  subject(:post) { Post.new }
  let(:vote) { Vote.new }
  let(:comment) {Comment.new}

  describe "associations" do
    it "should be able to get its vote" do
      expect { post.votes }.not_to raise_error
    end

    it "should be able to get its comment" do
      expect { post.comments}.not_to raise_error
    end
  end

end

describe Vote do

  subject(:vote){Vote.new}
  let(:post){Post.new}

  describe "associations" do
    it "should be able to get its post" do
      expect { vote.post }.not_to raise_error
    end
  end

end

describe Comment do

  subject(:comment){Comment.new}
  let(:post){Post.new}

  describe "associations" do
    it "should be able to get its post" do
      expect { comment.post }.not_to raise_error
    end
  end

end
