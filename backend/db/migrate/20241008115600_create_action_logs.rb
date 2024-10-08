class CreateActionLogs < ActiveRecord::Migration[7.2]
  def change
    create_table :action_logs do |t|
      t.string :action_type
      t.string :status
      t.text :details
      t.references :feedback, null: false, foreign_key: true

      t.timestamps
    end
  end
end
