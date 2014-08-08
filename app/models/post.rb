class Post < ActiveRecord::Base

  has_many :votes
  has_many :comments

  validates :status, presence: true
  validates :content, presence: true, length: { in: 3..144 }

  @life = 300 #in sec

  default_scope order('updated_at DESC').where('updated_at > ? ', Time.now.utc - @life)

  scope :drunk, -> {where(status: 'drunk').where('updated_at > ? ', Time.now.utc - @life)}
  scope :high, -> {where(status: 'high').where('updated_at > ? ', Time.now.utc - @life)}
  scope :sober, -> {where(status: 'sober').where('updated_at > ? ', Time.now.utc - @life)}

end
