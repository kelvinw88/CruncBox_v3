class Uploader < CarrierWave::Uploader::Base
  # storage :file

  include CarrierWave::MiniMagick

  def store_dir
    "uploads/posts_img"
  end

  def default_url
    ""
  end

end
