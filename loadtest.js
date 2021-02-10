import http from 'k6/http'
import { check, sleep, group } from 'k6'
import { Trend, Rate } from 'k6/metrics'

let StatusTrend = new Trend('Get status (no db)')
let FeedTrend = new Trend('Get feed')
let CreateUserTrend = new Trend('Create user')
let CreatePostTrend = new Trend('Create post')
let CreateCommentTrend = new Trend('Create comment')
let CreateLikeTrend = new Trend('Create like')

export let options = {
  vus: 20,
  duration: '10s',
  // httpDebug: 'full',
}

const SLEEP_DURATION = 0.1

const baseUrl = __ENV.API_URL
  ? `https://${__ENV.API_URL}`
  : `http://localhost:3000`
const endpoints = {
  status: `${baseUrl}/`,
  user: `${baseUrl}/user`,
  post: `${baseUrl}/post`,
  comment: `${baseUrl}/post/comment`,
  like: `${baseUrl}/post/like`,
  feed: `${baseUrl}/feed`,
}

export default function () {
  group('user flow', function () {
    // Get status
    let getStatusRes = http.get(endpoints.status)
    check(getStatusRes, { 'status was 200 (get status; no db)': (r) => r.status == 200 })
    StatusTrend.add(getStatusRes.timings.duration)

    sleep(SLEEP_DURATION)

    // Get feed
    let getFeedRes = http.get(endpoints.feed)
    check(getFeedRes, { 'status was 200 (get feed)': (r) => r.status == 200 })
    FeedTrend.add(getFeedRes.timings.duration)

    sleep(SLEEP_DURATION)

    // Create user
    let createUserRes = http.post(endpoints.user, {
      email: `daniel+${Date.now()}+${__VU}@gmail.com`,
      name: 'Daniel',
    })
    check(createUserRes, {
      'status was 200 (add user)': (r) => r.status == 200,
    })
    CreateUserTrend.add(createUserRes.timings.duration)

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
    CreatePostTrend.add(createPostRes.timings.duration)

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
    CreateCommentTrend.add(createCommentRes.timings.duration)

    sleep(SLEEP_DURATION)

    let createLikeRes = http.post(endpoints.like, {
      userEmail: userEmail,
      postId: postId,
    })
    check(createLikeRes, {
      'status was 200 (add like)': (r) => r.status == 200,
    })
    CreateLikeTrend.add(createLikeRes.timings.duration)

    sleep(SLEEP_DURATION)
  })
}

// Get feed       http localhost:3000/feed
// Create user    http POST localhost:3000/user email="norman@prisma.io" name="Daniel"
// Create post    http POST localhost:3000/post authorEmail="norman@prisma.io" title="Node.js best practices 2021"
// Add like       http POST localhost:3000/post/like userEmail="norman@prisma.io" postId=3
// Add comment    http POST localhost:3000/post/comment authorEmail="norman@prisma.io" postId=3 comment="wow"
