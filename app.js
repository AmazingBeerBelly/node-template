const Koa = require('koa')
const app = new Koa()
const koaBody = require('koa-body')
const jwt = require('koa-jwt')
const koaStatic = require('koa-static')

app
  .use((ctx, next) => {
    
  })