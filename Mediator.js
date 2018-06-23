const subscriptions = {}

export default function Mediator (obj) {
  const channels = {}

  const mediator = {
    subscribe: function (channel, cb) {
      if (!channels[channel]) {
        channels[channel] = []
      }

      channels[channel].push(cb)

      return this.unsubscribe.bind(null, channel, cb)
    },

    unsubscribe: function (channel, cb) {
      const i = channels[channel].indexOf(cb)

      if (i >= 0) {
        channels[channel].splice(i, 1)
        return true
      }

      return false
    },

    publish: function (channel) {
      if (!channels[channel]) {
        return false
      }

      const args = Array.prototype.slice.call(arguments, 1)

      channels[channel].forEach(subscription => {
        subscription.apply(null, args)
      })

      return this
    },
  }

  return obj ? Object.assign(obj, mediator) : mediator
}