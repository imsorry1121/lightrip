class AddMaxTimeMinTime < ActiveRecord::Migration
  def up
  	add_column :spots, :MinTime, :decimal
    add_column :spots, :MaxTime, :decimal
  end

  def down
  end
end
