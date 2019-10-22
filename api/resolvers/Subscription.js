const Subscription = {
  task: {
    subscribe(parent, args, context, info) {
      return context.pubsub.asyncIterator("task")
    }
  }
}

export { Subscription as default }
