class ActionLog < ApplicationRecord
  belongs_to :feedback

  validates :action_type, presence: true
  validates :status, presence: true
end
