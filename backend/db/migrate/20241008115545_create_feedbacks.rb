class CreateFeedbacks < ActiveRecord::Migration[7.2]
  def change
    create_table :feedbacks do |t|
      t.string :guest_name
      t.string :room_number
      t.text :content

      t.timestamps
    end
  end
end
