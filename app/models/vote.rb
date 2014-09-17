class Vote < ActiveRecord::Base

  belongs_to :post, touch: true

end
