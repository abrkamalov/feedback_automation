class OpenAIService
    # Comprehensive list of tags to avoid new, unexpected ones
    ACTIONABLE_TAGS = [
      'Housekeeping', 'Maintenance', 'Room Service', 'Wi-Fi', 'Check-in', 'Check-out',
      'Cleanliness', 'Noise', 'Food & Beverage', 'Billing', 'Amenities', 'Staff Attitude',
      'Accessibility', 'Air Conditioning', 'Entertainment', 'Facilities', 'Furniture',
      'Heating', 'Internet', 'Laundry', 'Lighting', 'Parking', 'Pool', 'Privacy', 'Security',
      'Smoking Policy', 'Temperature Control', 'Transportation'
    ]
  
    def self.generate_tags_and_trigger_actions(feedback)
      client = OpenAI::Client.new
      prompt = <<~PROMPT
        You are an AI assistant that classifies hotel guest feedback into actionable tags.
        Output the tags as a JSON array. Make sure all tags are from the following list: 
        #{ACTIONABLE_TAGS.to_s}.
        Feedback: "#{feedback.content}"
        Output example: {"tags": ["Housekeeping", "Maintenance"]}
      PROMPT
  
      response = client.chat(
        parameters: {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "Respond only with JSON-formatted data." },
            { role: "user", content: prompt }
          ],
          temperature: 0,
          response_format: { "type": "json_object" }
        }
      )
  
      # Parsing JSON output
      tags_json = response['choices'][0]['message']['content']
      tags_data = JSON.parse(tags_json)
      tags = tags_data['tags']
  
      # Process tags and trigger actions
      tags.each do |tag_name|
        feedback.tags.create(name: tag_name)
        if ACTIONABLE_TAGS.include?(tag_name)
          simulate_tool_call(feedback, tag_name)
        end
      end
    rescue JSON::ParserError => e
      # Handle JSON parsing errors if output is not valid JSON
      Rails.logger.error("Failed to parse JSON from OpenAI response: #{e.message}")
      # Optionally retry or handle the failure as needed
    end
  
    def self.simulate_tool_call(feedback, action_type)
      feedback.action_logs.create(
        action_type: action_type,
        status: 'Triggered',
        details: "Simulated tool call for #{action_type}"
      )
    end
  end
  