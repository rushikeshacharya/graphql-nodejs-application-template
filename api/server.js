import { GraphQLServer } from 'graphql-yoga'
import schema from './schema'

const server = new GraphQLServer(schema)

export { server as default }
