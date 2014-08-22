class ChangePostTable < ActiveRecord::Migration

  def change
    add_column(:posts, :filename, :string);
  end


end
