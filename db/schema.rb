# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20120606195833) do

  create_table "schedules", :force => true do |t|
    t.string   "user"
    t.string   "schedule_name"
    t.text     "content"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
    t.text     "share_uid"
  end

  create_table "spots", :force => true do |t|
    t.string   "name"
    t.string   "lat"
    t.string   "lon"
    t.text     "info"
    t.string   "opentime"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.string   "address"
    t.binary   "picture"
    t.decimal  "zoom"
    t.decimal  "attr1"
    t.decimal  "attr2"
    t.decimal  "attr3"
    t.decimal  "attr4"
    t.decimal  "attr5"
    t.decimal  "MinTime"
    t.decimal  "MaxTime"
    t.decimal  "city"
  end

  create_table "users", :force => true do |t|
    t.string   "fid"
    t.string   "name"
    t.text     "share_sid"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

end
