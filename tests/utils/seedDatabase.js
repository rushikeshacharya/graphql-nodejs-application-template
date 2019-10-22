import { prisma } from "../../api/generated/prisma-client"

const seedDatabase = async () => {
  await prisma.deleteManyTasks()
}

export { seedDatabase as default }
