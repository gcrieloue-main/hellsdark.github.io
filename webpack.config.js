const path = require("path");
const webpack = require("webpack");

const config = {
  entry: {
    blog: "./blog.js",
    cv: "./cv.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js"
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      uglifyOptions: { ecma: 8, sourceMap: true, comments: false }
    })
  ],
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
