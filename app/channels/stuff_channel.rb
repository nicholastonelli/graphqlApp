class StuffChannel < ApplicationCable::Channel
  def subscribed
    stream_from "stuff_channel"
  end

  def unsubscribed
  end
end