# app/graphql/resolvers/location_resolver.rb
module Resolvers
  class LocationResolver < BaseResolver
    type Types::LocationType, null: false
    argument :id, ID

    def resolve(id:)
      ::Location.find(id)
    end

  end
end