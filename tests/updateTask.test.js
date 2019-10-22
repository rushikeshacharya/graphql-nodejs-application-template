/* eslint-disable no-undef */
import 'cross-fetch/polyfill'
// eslint-disable-next-line import/no-unresolved
import getConnection from './utils/getConnection'
import { prisma } from '../api/generated/prisma-client'
import seedDatabase from './utils/seedDatabase'
import { createTask, updateTask } from './utils/queries'

let client
let response

beforeAll(async () => {
  client = getConnection()
  await seedDatabase()
})

describe('Test case for GraphQL Mutation : updateTask', () => {
  const taskData = {
    name: 'Drink Water',
    isCompleted: true
  }

  it('should update the given task by name', async () => {
    const task = await client.mutate({
      mutation: createTask,
      variables: {
        name: taskData.name
      }
    })
    response = await client.mutate({
      mutation: updateTask,
      variables: {
        id: task.data.createTask.id,
        data: {
          name: 'Drink Coffee'
        }
      }
    })

    const exists = await prisma.task({
      id: response.data.updateTask.id
    })
    expect(exists.name).toBe('Drink Coffee')
  })

  it('should update the given task by status', async () => {
    const task = await client.mutate({
      mutation: createTask,
      variables: {
        name: taskData.name
      }
    })
    response = await client.mutate({
      mutation: updateTask,
      variables: {
        id: task.data.createTask.id,
        data: {
          isCompleted: true
        }
      }
    })

    const exists = await prisma.task({
      id: response.data.updateTask.id
    })
    expect(exists.isCompleted).toBe(true)
  })

  it('should update the given task by Task name and status', async () => {
    const task = await client.mutate({
      mutation: createTask,
      variables: {
        name: taskData.name
      }
    })
    const newTask = {
      name: 'Drink Milk',
      isCompleted: true
    }
    response = await client.mutate({
      mutation: updateTask,
      variables: {
        id: task.data.createTask.id,
        data: newTask
      }
    })

    const exists = await prisma.task({
      id: response.data.updateTask.id
    })
    expect(exists.name).toBe(newTask.name)
    expect(exists.isCompleted).toBe(newTask.isCompleted)
  })
})
