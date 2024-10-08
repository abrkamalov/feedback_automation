class MockExternalService
    def self.call(action_type)
      # Simulate a delay
      sleep(1)
  
      # Simulate different responses based on action_type
      case action_type
      when 'Housekeeping'
        "Housekeeping request scheduled."
      when 'Maintenance'
        "Maintenance team notified."
      when 'Room Service'
        "Room service order placed."
      when 'Wi-Fi'
        "Wi-Fi issue reported to IT."
      when 'Check-in'
        "Front desk notified for check-in assistance."
      when 'Check-out'
        "Front desk notified for check-out assistance."
      when 'Cleanliness'
        "Cleaning staff alerted."
      when 'Noise'
        "Noise complaint logged."
      when 'Food & Beverage'
        "Food and beverage team notified."
      when 'Billing'
        "Billing inquiry forwarded to finance."
      when 'Amenities'
        "Amenities service scheduled."
      when 'Staff Attitude'
        "Feedback on staff attitude recorded."
      when 'Accessibility'
        "Accessibility issue reported."
      when 'Air Conditioning'
        "Air conditioning issue reported."
      when 'Entertainment'
        "Entertainment request processed."
      when 'Facilities'
        "Facilities team notified."
      when 'Furniture'
        "Furniture issue reported."
      when 'Heating'
        "Heating issue reported."
      when 'Internet'
        "Internet issue reported to IT."
      when 'Laundry'
        "Laundry service request placed."
      when 'Lighting'
        "Lighting issue reported."
      when 'Parking'
        "Parking inquiry forwarded to staff."
      when 'Pool'
        "Pool maintenance notified."
      when 'Privacy'
        "Privacy issue logged."
      when 'Security'
        "Security team notified."
      when 'Smoking Policy'
        "Smoking policy violation logged."
      when 'Temperature Control'
        "Temperature control issue reported."
      when 'Transportation'
        "Transportation request processed."
      else
        "No action taken."
      end
    end
  end
  