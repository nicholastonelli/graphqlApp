class Location < ApplicationRecord
  after_create :trigger_location_posted_event

  after_update :trigger_location_updated_event

  private

  #def trigger_location_posted_event
  #  ApplicationSubscription.trigger("locationPosted", {}, { location: self })
  #end

  def trigger_location_posted_event
    puts "CHECKING POST"
    AppSchema.subscriptions.trigger("locationPosted", {}, { location: self })
  end

  def trigger_location_updated_event
    puts "CHECKING UPDATE"
  end
end
