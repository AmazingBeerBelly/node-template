const Koa = require('koa')
const app = new Koa()
const koaBody = require('koa-body')
const jwt = require('koa-jwt')
const koaStatic = require('koa-static')
const https = require('https')
const fs = require('fs')

const { errorType } = require('./constans')

app
  .use((ctx, next) => {
    return next().catch(err => {
      if (err.status === 401) {
        ctx.status = 200
        ctx.body = {
          error_code: errorType.AUTH_FAILED.code,
          error_msg: err.originalError ? err.originalError.message : err.message
        }
      } else {
        throw err
      }
    })
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
