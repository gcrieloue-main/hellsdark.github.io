const path = require("path");
const webpack = require("webpack");

const config = {
  entry: {
    index: "./js/index.js",
    blog: "./js/blog.js",
    cv: "./js/cv.js",
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
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '.'),
    },
    compress: true,
    port: 9000,
    hot: true
  },
};

module.exports = config;
