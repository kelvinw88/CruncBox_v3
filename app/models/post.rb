class Post < ActiveRecord::Base

  has_many :votes
  has_many :comments

  validates :status, presence: true,
  validates :content, presence: true, length: { in: 3..144 }



end
