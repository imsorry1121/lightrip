class AddCityAttr < ActiveRecord::Migration
  def up
  	add_column :spots, :city, :decimal
  end

  def down
  end
end
