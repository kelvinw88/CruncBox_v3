class AddTables < ActiveRecord::Migration

  def change

    create_table :posts do |t|
      t.string :content
      t.string :status
      t.timestamps
    end

    create_table :votes do |t|
      t.references :post
      t.timestamps
    end

    create_table :comments do |t|
      t.references :post
      t.string :content
      t.timestamps
    end
  end


end
