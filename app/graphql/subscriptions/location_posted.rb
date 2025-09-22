
module Subscriptions
  class LocationPosted < BaseSubscription
    field :location, Types::LocationType, null: false
  end
end