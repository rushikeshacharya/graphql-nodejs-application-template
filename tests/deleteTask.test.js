/* eslint-disable no-undef */
import 'cross-fetch/polyfill'
// eslint-disable-next-line import/no-unresolved
import { prisma } from '../api/generated/prisma-client'
import getConnection from './utils/getConnection'
import seedDatabase from './utils/seedDatabase'
import { createTask, deleteTask } from './utils/queries'

let client
let response

beforeAll(async () => {
  client = getConnection()
  await seedDatabase()
})

describe('Test case for GraphQL Mutation : deleteTask', () => {
  const taskData = {
    name: 'Drink Water'
  }

  it('should delete the given task by id', async () => {
    const res = await client.mutate({
      mutation: createTask,
      variables: taskData
    })

    response = await client.mutate({
      mutation: deleteTask,
      variables: {
        id: res.data.createTask.id
      }
    })

    const exists = await prisma.$exists.task({
      id: response.data.deleteTask.id
    })
    expect(exists).toBe(false)
  })
})
