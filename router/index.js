const fs = require('fs')
const router = require('koa-router')()

const files = fs.readdirSync('./router', 'utf-8')
files.forEach(item => {
  const name = item.split('.')[0]
  if (name !== 'index') {
    require(`./${name}`)(router)
  }
})

router
  .get('*', (ctx, next) => {
    ctx.status = 404
    ctx.body = '404'
  })

module.exports = router
