class CreateBlogs < ActiveRecord::Migration[6.0]
  def change
    create_table :blogs do |t|
      t.string :title
      t.string :author
      t.string :content
      t.integer :likes

      t.timestamps
    end
  end
end
