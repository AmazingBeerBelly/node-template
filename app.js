const Koa = require('koa')
const app = new Koa()
const koaBody = require('koa-body')
const jwt = require('koa-jwt')
const koaStatic = require('koa-static')
const https = require('https')
const fs = require('fs')
const path = require('path')

const { ERROR_TYPE } = require('./constans')
const router = require('./router')

app
  .use((ctx, next) => {
    return next().catch(err => {
      if (err.status === 401) {
        ctx.status = 200
        ctx.body = {
          error_code: ERROR_TYPE.AUTH_FAILED.code,
          error_msg: err.originalError ? err.originalError.message : err.message
        }
      } else {
        throw err
      }
    })
  })
  // 跨域
  .use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', ctx.header.origin)
    ctx.set('Access-Control-Allow-Credentials', true)
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    ctx.set('Access-Control-Allow-Headers', 'X-Real-IP, Content-Type, Authorization')
  })
  .use(koaStatic(path.join(__dirname, 'public')))
  .use(koaBody({ multipart: true }))
  .use(router.routes())
  .use(router.allowedMethods())

const server = require('http').createServer(app.callback())
server.listen(6000, '0.0.0.0')

// if using https
// const httpsOption = {
//   key: fs.readFileSync('/etc/letsencrypt/live/xxx.com/privkey.pem'),
//   cert: fs.readFileSync('/etc/letsencrypt/live/xxx.com/fullchain.pem')
// }
// https.createServer(httpsOption, app.callback()).listen(6001, '0.0.0.0')
