import http from 'k6/http'
import { check, sleep, group } from 'k6'
import { Trend, Rate } from 'k6/metrics'

export let options = {
  vus: 10,
  duration: '15s',
  thresholds: {
    http_req_duration: ['p(90) < 400'],
  },
}

const SLEEP_DURATION = 0.1

const baseUrl = 'http://localhost:3000'
const endpoints = {
  user: `${baseUrl}/user`,
  post: `${baseUrl}/post`,
  comment: `${baseUrl}/post/comment`,
  like: `${baseUrl}/post/like`,
  feed: `${baseUrl}/feed`,
}

export default function () {
  group('user flow', function () {
    // Get feed
    let res = http.get(endpoints.feed)
    check(res, { 'status was 200 (get feed)': (r) => r.status == 200 })

    // Create user
    let createUserRes = http.post(endpoints.user, {
      email: `daniel+${Date.now()}@gmail.com`,
      name: 'Daniel',
    })
    check(createUserRes, {
      'status was 200 (add user)': (r) => r.status == 200,
    })

    sleep(SLEEP_DURATION)

    let userEmail = JSON.parse(createUserRes.body).email

    // Create post
    let createPostRes = http.post(endpoints.post, {
      authorEmail: userEmail,
      title: 'Load testing your REST API',
    })
    check(createPostRes, {
      'status was 200 (add post)': (r) => r.status == 200,
    })
    let postId = JSON.parse(createPostRes.body).id
    sleep(SLEEP_DURATION)

    // Create comment
    let createCommentRes = http.post(endpoints.comment, {
      postId: postId,
      authorEmail: userEmail,
      comment: 'Interesting post',
    })
    check(createCommentRes, {
      'status was 200 (add comment)': (r) => r.status == 200,
    })

    let createLikeRes = http.post(endpoints.like, {
      userEmail: userEmail,
      postId: postId,
    })
    check(createLikeRes, {
      'status was 200 (add like)': (r) => r.status == 200,
    })
    sleep(SLEEP_DURATION)
  })
}

// Get feed       http localhost:3000/feed
// Create user    http POST localhost:3000/user email="norman@prisma.io" name="Daniel"
// Create post    http POST localhost:3000/post authorEmail="norman@prisma.io" title="Node.js best practices 2021"
// Add like       http POST localhost:3000/post/like userEmail="norman@prisma.io" postId=3
// Add comment    http POST localhost:3000/post/comment authorEmail="norman@prisma.io" postId=3 comment="wow"
