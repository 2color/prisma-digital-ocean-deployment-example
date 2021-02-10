const fp = require('fastify-plugin')
const { PrismaClient } = require('@prisma/client')

function prismaPlugin(fastify, opts, done) {
  const prisma = new PrismaClient()
  fastify.decorate('prisma', prisma)

  done()
}

module.exports = fp(prismaPlugin)
