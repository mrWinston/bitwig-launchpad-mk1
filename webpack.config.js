//webpack.config.js
const webpack = require('webpack');
const path = require('path');
const file = require('fs');

const header = file.readFileSync('./src/header.js', 'utf-8');

const banner = new webpack.BannerPlugin({
  banner: header.toString(),
  raw: true,
  entryOnly: true,
})

module.exports = {
  mode: "development",
  devtool: false,
  entry: {
    main: "./src/launchpad-mk1.control.ts",
  },
  output: {
//    path: path.resolve(__dirname, './build'),
    path: __dirname,
    filename: "launchpad-mk1.control.js" // <--- Will be compiled to this single file
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  },
  plugins: [
    banner,
  ]
};
