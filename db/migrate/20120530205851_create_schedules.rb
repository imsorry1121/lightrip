class CreateSchedules < ActiveRecord::Migration
  def change
    create_table :schedules do |t|
      t.string :user
      t.string :schedule_name
      t.text :content

      t.timestamps
    end
  end
end
