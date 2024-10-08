require 'openai'

OpenAI.configure do |config|
    config.access_token = ENV.fetch('OPENAI_API_KEY') { raise 'OPENAI_API_KEY is not set in the environment' }
end
