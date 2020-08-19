const http = require('http');
// const querystring = require('querystring')
const fs = require('fs')
const archiver = require('archiver');

let packname = './package'
// fs.stat(filename, (err, stat) => {
const options = {
    host: 'localhost',
    port: 8085,
    path: '/?filename=package.zip',
    method: "POST",
    headers: {
        'Content-Type': 'application/octet-stream'
    }
};

const req = http.request(options, (res) => {
});
req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

var archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
});
archive.directory(packname, false);
archive.finalize();

//   let readStream = fs.createReadStream("./pic.jpg")
archive.pipe(req)
archive.on('end', () => {
    req.end();
})
// Write data to request body
//   req.end();
// })

