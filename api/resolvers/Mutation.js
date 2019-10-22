const Mutation = {
  createTask: async (parent, args, context) => {
    if (!args.name) {
      throw new Error("Task name should not be empty")
    }
    const res = await context.prisma.createTask({
      name: args.name
    })

    if (res) {
      context.pubsub.publish("task", {
        task: {
          id: res.id,
          name: res.name,
          isCompleted: res.isCompleted
        }
      })
    }
    return res
  },
  updateTask: (parent, args, context) => {
    const { id, data } = args
    return context.prisma.updateTask({
      data,
      where: {
        id
      }
    })
  },
  deleteTask: (parent, args, context) => {
    return context.prisma.deleteTask({
      id: args.id
    })
  }
}

module.exports = {
  Mutation
}
