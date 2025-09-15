# app/graphql/resolvers/locations_resolver.rb
module Resolvers
  class LocationsResolver < BaseResolver
    type [Types::LocationType], null: false
    #argument :id, ID

    def resolve()
      ::Location.all
    end

  end
end