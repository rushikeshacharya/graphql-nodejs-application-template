import { gql } from "apollo-boost"

const createTask = gql`
  mutation($name: String!) {
    createTask(name: $name) {
      id
      name
      isCompleted
    }
  }
`
const getTasks = gql`
  query {
    tasks {
      id
      name
      isCompleted
    }
  }
`
const deleteTask = gql`
  mutation($id: ID!) {
    deleteTask(id: $id) {
      id
      name
      isCompleted
    }
  }
`
const updateTask = gql`
  mutation($id: ID!, $data: UpdateTaskInput!) {
    updateTask(id: $id, data: $data) {
      id
      name
      isCompleted
    }
  }
`

export { createTask, updateTask, getTasks, deleteTask }
