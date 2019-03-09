const koa = require('koa')
const koaRouter = require('koa-router')
const index = require('./data/index')
const glob = require('glob')
const path = require('path')
const sites = []
index.forEach(function(site) {
  sites[site.index] = require('./data/sites/'+ site.index + '.json')
})

const cors = require('@koa/cors')
// const config = require('config')

const app = new koa()
const router = new koaRouter()

app.use(cors());

router.get('/site/:id', (ctx, next) => {
  return ctx.body = {
    status: 'success',
    data: sites[ctx.params.id]
  }
}).get('/', (ctx, next) => {
  return ctx.body = {
    status: 'success',
    data: index
  }
})

app.use(router.routes())
  .use(router.allowedMethods())


app.listen(3083)