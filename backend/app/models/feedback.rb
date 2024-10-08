class Feedback < ApplicationRecord
    has_many :tags, dependent: :destroy
    has_many :action_logs, dependent: :destroy
end
