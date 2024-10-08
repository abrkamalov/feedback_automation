# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 2024_10_08_115600) do
  create_table "action_logs", force: :cascade do |t|
    t.string "action_type"
    t.string "status"
    t.text "details"
    t.integer "feedback_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["feedback_id"], name: "index_action_logs_on_feedback_id"
  end

  create_table "feedbacks", force: :cascade do |t|
    t.string "guest_name"
    t.string "room_number"
    t.text "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tags", force: :cascade do |t|
    t.string "name"
    t.integer "feedback_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["feedback_id"], name: "index_tags_on_feedback_id"
  end

  add_foreign_key "action_logs", "feedbacks"
  add_foreign_key "tags", "feedbacks"
end
