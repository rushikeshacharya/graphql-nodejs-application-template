/* eslint-disable no-undef */
import 'cross-fetch/polyfill'
// eslint-disable-next-line import/no-unresolved
import getConnection from './utils/getConnection'
import seedDatabase from './utils/seedDatabase'
import { createTask, getTasks } from './utils/queries'

let client
let response

beforeAll(async () => {
  client = getConnection()
  await seedDatabase()
})

describe('Tast cases for Graphql Queries', () => {
  const taskData = {
    name: 'Drink Water'
  }

  it('should create a new task', async () => {
    response = await client.mutate({
      mutation: createTask,
      variables: taskData
    })
  })

  it('should return the task', async () => {
    response = await client.query({ query: getTasks })
    expect(response.data.tasks.length).toBeGreaterThan(0)
  })
  it('should return the task name', async () => {
    response = await client.query({ query: getTasks })
    expect(response.data.tasks[0].name).toBe(taskData.name)
  })
  it('should return the task status as false', async () => {
    response = await client.query({ query: getTasks })
    expect(response.data.tasks[0].isCompleted).toBe(false)
  })
  it('should return the task id', async () => {
    response = await client.query({ query: getTasks })
    expect(response.data.tasks[0].id).not.toBe(null)
  })
})
