const path = require("path");
const webpack = require("webpack");
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  entry: {
    index: "./js/index.js",
    blog: "./blog/blog.js",
    cv: "./cv/cv.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./[name].bundle.js",
  },
  target : 'web',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        }
    ],
  },
  resolve: {
    alias: {
      '@Shared':  path.resolve(__dirname, 'js'),
    }
  },
  devServer: {
    static:  { 
      directory: path.resolve(__dirname, '.')
    },
    compress: true,
    port: 9000
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};