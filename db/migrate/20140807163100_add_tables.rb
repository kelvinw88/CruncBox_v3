class AddTables < ActiveRecord::Migration

  def change

    create_table :posts do |t|
      t.string :content
      t.string :status
      t.boolean :alive
      t.timestamps
    end

    create_table :vote do |t|
      t.references :post
      t.timestamps
    end

    create_table :comment do |t|
      t.references :post
      t.string :content
      t.timestamps
    end
  end


end
