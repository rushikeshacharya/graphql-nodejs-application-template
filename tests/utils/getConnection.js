import 'cross-fetch/polyfill'
import ApolloBoost from 'apollo-boost'

const getConnection = () => {
  return new ApolloBoost({
    uri: 'http://localhost:4004'
  })
}

export { getConnection as default }
