const http = require('http');
const archiver = require('archiver');
const child_process = require('child_process')

let packname = './package'

let redirect_uri = encodeURIComponent("http://localhost:8085/auth")
child_process.exec(`start https://github.com/login/oauth/authorize?client_id=Iv1.03bc1a85cd8267a3&redirect_uri=${redirect_uri}&scope=read%3Auser&state=123abc`)

const server = http.createServer((request1, res) => {
    let token = request1.url.match(/token=([^&]+)/)[1]
    const options = {
        host: 'localhost',
        port: 8085,
        path: '/?filename=package.zip',
        method: "POST",
        headers: {
            'token': token,
            'Content-Type': 'application/octet-stream'
        }
    };

    const request = http.request(options, (res) => {
    });
    request.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });

    var archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
    });
    archive.directory(packname, false);
    archive.finalize();

    archive.pipe(request)
    archive.on('end', () => {
        let redirect_uri = encodeURIComponent("http://localhost:8085/auth")
        child_process.exec(`start https://github.com/login/oauth/authorize?client_id=Iv1.03bc1a85cd8267a3&redirect_uri=${redirect_uri}&scope=read%3Auser&state=123abc`)
        request.end();
        server.close()
    })
})

server.listen(8080)
// fs.stat(filename, (err, stat) => {
// const options = {
//     host: 'localhost',
//     port: 8085,
//     path: '/?filename=package.zip',
//     method: "POST",
//     headers: {
//         'Content-Type': 'application/octet-stream'
//     }
// };

// const request = http.request(options, (res) => {
// });
// request.on('error', (e) => {
//     console.error(`problem with request: ${e.message}`);
// });

// var archive = archiver('zip', {
//     zlib: { level: 9 } // Sets the compression level.
// });
// archive.directory(packname, false);
// archive.finalize();

// archive.pipe(request)
// archive.on('end', () => {
//     let redirect_uri = encodeURIComponent("http://localhost:8085/auth")
//     child_process.exec(`start https://github.com/login/oauth/authorize?client_id=Iv1.03bc1a85cd8267a3&redirect_uri=${redirect_uri}&scope=read%3Auser&state=123abc`)
//     request.end();
// })

