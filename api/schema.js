import { PubSub } from 'graphql-yoga'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Subscription from './resolvers/Subscription'
import { prisma } from './generated/prisma-client'

const pubsub = new PubSub()

const schema = {
  typeDefs: 'api/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Subscription
  },
  context: { prisma, pubsub }
}

export default schema
