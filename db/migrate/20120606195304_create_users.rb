class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :fid
      t.string :name
      t.text :share_sid

      t.timestamps
    end
  end
end
