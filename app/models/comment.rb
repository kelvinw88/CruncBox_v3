class Comment < ActiveRecord::Base

  belongs_to :post, touch: true
  validates :content, presence: true, length: { in: 3..144 }

end
