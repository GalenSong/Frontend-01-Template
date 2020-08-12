const npm = require('npm')

let config = {
    "name": "npm-demo",
    "version": "1.0.0",
    "description": "",
    "main": "main.js",
    "dependencies": {
      "npm": "^6.14.7"
    },
    "devDependencies": {},
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "",
    "license": "ISC"
  }

  npm.load(config, (err) => {
      npm.install('webpack', (err) => {
          console.log(err)
      })
  })

npm.install('webpack', (err) => {
    console.log(err)
})