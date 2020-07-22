const path = require('path');

module.exports = {
  //...
  entry: './src/main.js',
  mode: "development",
  module: {
    rules: [
        {
            test: /\.view?$/,
            use: {
                loader: path.resolve("./myloader.js")
            }
        }
    ]
  }
};