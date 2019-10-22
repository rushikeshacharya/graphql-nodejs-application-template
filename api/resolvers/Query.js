const Query = {
  tasks: (parent, args, context) => {
    return context.prisma.tasks()
  },
  getTaskByStatus: (parent, args, context) => {
    return context.prisma.tasks({
      where: {
        isCompleted: args.isCompleted
      }
    })
  }
}

module.exports = {
  Query
}
