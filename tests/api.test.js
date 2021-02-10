const createServer = require('../src/app')

const test = async () => {
  const server = createServer()

  const response = await server.inject({
    method: 'GET',
    url: '/'
  })

  console.log('status code: ', response.statusCode)
  console.log('body: ', response.body)
}
test()
