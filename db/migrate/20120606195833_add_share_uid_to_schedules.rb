class AddShareUidToSchedules < ActiveRecord::Migration
  def change
  	add_column :schedules, :share_uid, :text
  end
end
