require('@babel/register')
require('@babel/polyfill/noConflict')
const server = require('../../api/server').default

module.exports = async () => {
  global.httpServer = await server.start({ port: 4004 })
}
