/* eslint-disable no-undef */
import 'cross-fetch/polyfill'
// eslint-disable-next-line import/no-unresolved
import { prisma } from '../api/generated/prisma-client'
import getConnection from './utils/getConnection'
import seedDatabase from './utils/seedDatabase'
import { createTask } from './utils/queries'

let client
let response

beforeAll(async () => {
  client = getConnection()
  await seedDatabase()
})

describe('Test case for GraphQL Mutation : createTask', () => {
  const taskData = {
    name: 'Drink Water'
  }

  it('should create a new task', async () => {
    response = await client.mutate({
      mutation: createTask,
      variables: taskData
    })

    const exists = await prisma.$exists.task({
      id: response.data.createTask.id
    })
    expect(exists).toBe(true)
  })

  it('should match the name of the created task', async () => {
    expect(response.data.createTask.name).toBe(taskData.name)
  })

  it('should match the status of the created task', async () => {
    expect(response.data.createTask.isCompleted).toBe(false)
  })
})
