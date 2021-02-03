# Prisma with Fastify deployed to DigitalOcean App Platform Example

REST API with Fastify and Prisma deployed to DigitalOcean App Platform

## Load tests

To run load tests, install [k6](https://k6.io/docs/getting-started/installation) and run the following

```command
k6 run loadtest.js
```


### Results

#### 1 Virtual user

```
    █ user flow

      ✓ status was 200 (add comment)
      ✓ status was 200 (add like)
      ✓ status was 200 (get feed)
      ✓ status was 200 (add user)
      ✓ status was 200 (add post)

    Create comment.............: avg=95.980364  min=79.852   med=84.574   max=192.706  p(90)=104.719  p(95)=148.7125
    Create like................: avg=86.398818  min=75.377   med=80.467   max=116.312  p(90)=98.882   p(95)=107.597
    Create post................: avg=82.687727  min=66.22    med=74.572   max=142.096  p(90)=106.423  p(95)=124.2595
    Create user................: avg=71.901273  min=61.329   med=66.403   max=95.073   p(90)=90.464   p(95)=92.7685
    Get feed...................: avg=129.533364 min=86.11    med=126.692  max=230.092  p(90)=148.125  p(95)=189.1085
    checks.....................: 100.00% ✓ 55  ✗ 0
    data_received..............: 23 kB   2.1 kB/s
    data_sent..................: 8.8 kB  799 B/s
    group_duration.............: avg=994.96ms   min=915.85ms med=950.14ms max=1.31s    p(90)=1.1s     p(95)=1.21s
    http_req_blocked...........: avg=3.14ms     min=0s       med=1µs      max=172.71ms p(90)=1µs      p(95)=1µs
    http_req_connecting........: avg=351.25µs   min=0s       med=0s       max=19.31ms  p(90)=0s       p(95)=0s
    http_req_duration..........: avg=93.3ms     min=61.32ms  med=82.13ms  max=230.09ms p(90)=132.41ms p(95)=143.9ms
    http_req_receiving.........: avg=297.38µs   min=105µs    med=210µs    max=1.78ms   p(90)=377.6µs  p(95)=581.79µs
    http_req_sending...........: avg=149.21µs   min=63µs     med=148µs    max=354µs    p(90)=229.6µs  p(95)=248.79µs
    http_req_tls_handshaking...: avg=2.76ms     min=0s       med=0s       max=152.34ms p(90)=0s       p(95)=0s
    http_req_waiting...........: avg=92.85ms    min=61.02ms  med=81.78ms  max=229.76ms p(90)=131.98ms p(95)=143.49ms
    http_reqs..................: 55      5.015561/s
    iteration_duration.........: avg=995.04ms   min=915.91ms med=950.23ms max=1.31s    p(90)=1.1s     p(95)=1.21s
    iterations.................: 11      1.003112/s
    vus........................: 1       min=1 max=1
    vus_max....................: 1       min=1 max=1
  ```

#### 40 Virtual users

```
default ✓ [======================================] 40 VUs  15s

    █ user flow

      ✗ status was 200 (add like)
       ↳  95% — ✓ 268 / ✗ 13
      ✓ status was 200 (get feed)
      ✗ status was 200 (add user)
       ↳  95% — ✓ 268 / ✗ 13
      ✗ status was 200 (add post)
       ↳  95% — ✓ 268 / ✗ 13
      ✗ status was 200 (add comment)
       ↳  95% — ✓ 268 / ✗ 13

    Create comment.............: avg=379.552217 min=71.039  med=396.706  max=638.519  p(90)=500.934  p(95)=510.705
    Create like................: avg=372.98574  min=52.376  med=388.426  max=707.189  p(90)=503.454  p(95)=523.766
    Create post................: avg=376.086466 min=185.21  med=389.234  max=687.568  p(90)=490.111  p(95)=501.498
    Create user................: avg=327.436391 min=160.911 med=310.098  max=631.352  p(90)=409.485  p(95)=426.292
    Get feed...................: avg=298.284843 min=116.307 med=293.169  max=774.394  p(90)=413.736  p(95)=465.27
    checks.....................: 96.29% ✓ 1353 ✗ 52
    data_received..............: 1.5 MB 92 kB/s
    data_sent..................: 283 kB 17 kB/s
    group_duration.............: avg=2.28s      min=1.56s   med=2.28s    max=3.33s    p(90)=2.61s    p(95)=2.72s
    http_req_blocked...........: avg=4.84ms     min=0s      med=1µs      max=171.14ms p(90)=1µs      p(95)=1µs
    http_req_connecting........: avg=856.42µs   min=0s      med=0s       max=42.55ms  p(90)=0s       p(95)=0s
    http_req_duration..........: avg=350.86ms   min=52.37ms med=355.33ms max=774.39ms p(90)=489.35ms p(95)=506.16ms
    http_req_receiving.........: avg=277.9µs    min=30µs    med=154µs    max=5.23ms   p(90)=649µs    p(95)=926.79µs
    http_req_sending...........: avg=110.83µs   min=23µs    med=104µs    max=408µs    p(90)=178µs    p(95)=197.79µs
    http_req_tls_handshaking...: avg=3.96ms     min=0s      med=0s       max=149.01ms p(90)=0s       p(95)=0s
    http_req_waiting...........: avg=350.48ms   min=52.11ms med=355.05ms max=774.2ms  p(90)=488.99ms p(95)=505.75ms
    http_reqs..................: 1405   83.845957/s
    iteration_duration.........: avg=2.28s      min=1.56s   med=2.28s    max=3.33s    p(90)=2.61s    p(95)=2.72s
    iterations.................: 281    16.769191/s
    vus........................: 24     min=24 max=40
    vus_max....................: 40     min=40 max=40
```