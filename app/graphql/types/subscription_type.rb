
module Types
  class SubscriptionType < Types::BaseObject
    description "The subscription root for the GraphQL schema"

    field :location_posted, subscription: Subscriptions::LocationPosted
  end
end