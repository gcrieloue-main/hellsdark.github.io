const path = require("path");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const config = {
  entry: {
    blog: "./js/blog.js",
    cv: "./js/cv.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./js/[name].bundle.js"
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  }
};

module.exports = config;
