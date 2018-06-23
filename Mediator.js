const subscriptions = {}

export default class Mediator {
  subscribe (topic, cb) {
    if (!subscriptions[topic]) {
      subscriptions[topic] = []
    }

    subscriptions[topic].push(cb)

    return this.unsubscribe.bind(null, topic, cb)
  }

  unsubscribe (topic, cb) {
    const i = subscriptions[topic].indexOf(cb)

    if (i >= 0) {
      subscriptions[topic].splice(i, 1)
      return true
    }

    return false
  }

  publish (topic, data) {
    if (!subscriptions[topic]) {
      return false
    }

    subscriptions[topic].forEach(subscription => {
      subscription.call(null, data)
    })

    return true
  }
}