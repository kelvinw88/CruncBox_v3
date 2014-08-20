class Post < ActiveRecord::Base

  has_many :votes
  has_many :comments

  mount_uploader :file, Uploader

  validates :status, presence: true
  validates :content, presence: true, length: { in: 3..144 }


  @life = 30 #in sec


  scope :drunk, -> {where(status: 'drunk').where('updated_at > ? ', Time.now.utc - @life)}
  scope :high, -> {where(status: 'high').where('updated_at > ? ', Time.now.utc - @life)}
  scope :sober, -> {where(status: 'sober').where('updated_at > ? ', Time.now.utc - @life)}
  scope :alive, -> {order('updated_at DESC').where('updated_at > ? ', Time.now.utc - @life)}

end
