const { PrismaClient } = require('@prisma/client')
const app = require('fastify')({ logger: true })

const prisma = new PrismaClient()

app.register(require('fastify-formbody'))

app.get(`/`, async (req, res) => {
  return { up: true }
})

app.post(`/user`, async (req, res) => {
  const { email, name } = req.body
  const result = await prisma.user.create({
    data: {
      email,
      name,
    },
  })
  return result
})

app.post(`/post`, async (req, res) => {
  const { title, content, authorEmail } = req.body
  const result = await prisma.post.create({
    data: {
      title,
      content,
      author: { connect: { email: authorEmail } },
    },
  })
  return result
})

app.post(`/post/comment`, async (req, res) => {
  const { comment, postId, authorEmail } = req.body

  const result = await prisma.comment.create({
    data: {
      comment,
      post: { connect: { id: parseInt(postId) } },
      author: { connect: { email: authorEmail } },
    },
  })
  return result
})

app.post(`/post/like`, async (req, res) => {
  const { postId, userEmail } = req.body
  const result = await prisma.user.update({
    data: {
      likes: {
        connect: {
          id: parseInt(postId),
        },
      },
    },
    where: {
      email: userEmail,
    },
  })
  return result
})

app.delete(`/post/:id`, async (req, res) => {
  const { id } = req.params
  const post = await prisma.post.delete({
    where: {
      id: parseInt(id),
    },
  })
  return post
})

app.get(`/post/:id`, async (req, res) => {
  const { id } = req.params
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      author: true
    }
  })
  return post
})

app.get('/feed', async (req, res) => {
  const posts = await prisma.post.findMany({
    include: { author: true },
    orderBy: [{ id: 'desc' }],
    take: 25,
  })
  return posts
})

app.get('/filterPosts', async (req, res) => {
  const { searchString } = req.query
  const draftPosts = await prisma.post.findMany({
    where: {
      OR: [
        {
          title: {
            contains: searchString,
          },
        },
        {
          content: {
            contains: searchString,
          },
        },
      ],
    },
  })
  return draftPosts
})

const start = async () => {
  try {
    const port = process.env.PORT ?? 3000
    await app.listen(port, '0.0.0.0')
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
