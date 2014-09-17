class Uploader < CarrierWave::Uploader::Base

  include CarrierWave::MiniMagick

  def store_dir
    "uploads/posts_img"
  end

  def default_url
    ""
  end

end
