const fastify = require('fastify')
function createServer(opts = {}) {
  const server = fastify(opts)
  server.register(require('fastify-formbody'))

  server.register(require('./plugins/prisma'))
  server.register(require('./plugins/routes'))

  return server
}

module.exports = createServer
