const router = require('koa-router')()
const fs = require('fs');
const unzipper = require('unzipper')
const https = require('https');
const { resolve } = require('path');
const { rejects } = require('assert');
const { request } = require('http');

router.post('/', async (ctx, next) => {
  let {req, request} = ctx
  userAuthorize(ctx)
})

function receiveData() {
  let filename = request.query.filename
  if(!filename) return
  let writeStream = unzipper.Extract({ path: '../server/public' })
  req.pipe(writeStream)
  req.on('end', () => {
    ctx.set({'Content-Type': 'text/plain'})
    ctx.status = 200
    ctx.body = "okey"
  })
}

function userAuthorize(ctx) {
  let {request} = ctx
  const options = {
    hostname: 'api.github.com',
    port: 443,
    path: `/user`,
    method: 'GET',
    headers: {
      Authorization: `token ${request.headers.token}`,
      "User-Agent": "toy=publish-server"
    }
  };
  
  return new Promise((resolve, reject) => {
    const loginReq = https.request(options, (res) => {
      let body = ""
    
      res.on('data', (d) => {
        console.log(d)
        body += d.toString()
      });
    });
    
    loginReq.on('error', (e) => {
      console.error(e);
    });
    loginReq.on('end', (d) => {
      body += d.toString()
      resolve(body)
      receiveData()
    });
  })
}



router.get('/auth', async (ctx, next) => {
  let {request} = ctx
  let code = request.query.code
  let state = "abc123"
  let client_secret = "82cc7516762babe70e22615a9bd8795b489ff2f1"
  let client_id = "Iv1.03bc1a85cd8267a3"
  let redirect_uri = encodeURIComponent("http://localhost:8085/auth")
  
  let params = `code=${code}&state=${state}&client_secret=${client_secret}&client_id=${client_id}&redirect_uri=${redirect_uri}`

  const options = {
    hostname: 'github.com',
    port: 443,
    path: `/login/oauth/access_token?${params}`,
    method: 'POST'
  };

  return new Promise((resolve, reject) => {
    const loginReq = https.request(options, (res) => {
      console.log('statusCode:', res.statusCode);
      console.log('headers:', res.headers);
    
      res.on('data', (d) => {
        let result = d.toString().match(/access_token=([^&]+)/)
        if(result) {
          let token = result[1]
          ctx.set({
            'access_token': token,
            'Content-Type': 'text/html'
          });
          ctx.status = 200
          ctx.body = `<a href="http://localhost:8080/publish?token=${token}">publish</a>`
        } else {
          ctx.status = 200
          ctx.body = 'error'
        }
        resolve()
      });
    });
    
    loginReq.on('error', (e) => {
      console.error(e);
    });
    loginReq.end();
  })
  
  
})

module.exports = router
