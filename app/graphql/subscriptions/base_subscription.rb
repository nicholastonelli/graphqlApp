module Subscriptions
  class BaseSubscription < GraphQL::Schema::Subscription
    #def current_application_context
    #  context[:current_application_context]
    #end
    # Hook up base classes
    object_class Types::BaseObject
    field_class Types::BaseField
    argument_class Types::BaseArgument
  end
end