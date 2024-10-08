require_relative '../services/openai_service'

class FeedbacksController < ApplicationController
  def create
    @feedback = Feedback.new(feedback_params)
    if @feedback.save
      OpenAIService.generate_tags_and_trigger_actions(@feedback)
      render json: @feedback.to_json(include: [:tags, :action_logs]), status: :created
    else
      render json: @feedback.errors, status: :unprocessable_entity
    end
  end

  def index
    @feedbacks = Feedback.all.includes(:tags, :action_logs)
    render json: @feedbacks.to_json(include: [:tags, :action_logs])
  end

  def show
    @feedback = Feedback.find(params[:id])
    render json: @feedback.to_json(include: [:tags, :action_logs])
  end

  def destroy
    @feedback = Feedback.find(params[:id])
    if @feedback.destroy
      head :no_content
    else
      render json: @feedback.errors, status: :unprocessable_entity
    end
  end

  private

  def feedback_params
    params.require(:feedback).permit(:guest_name, :room_number, :content)
  end
end
