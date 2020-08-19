const router = require('koa-router')()
const fs = require('fs');
const unzipper = require('unzipper')

router.post('/', async (ctx, next) => {
  let {req, request} = ctx
  let filename = request.query.filename
  if(!filename) return
  let writeStream = unzipper.Extract({ path: '../server/public' })
  req.pipe(writeStream)
  req.on('end', () => {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end('okey')
  })
})

module.exports = router
