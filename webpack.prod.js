const webpack = require("webpack"),
      merge = require("webpack-merge"),
      config = require("./webpack.config.js"),
      CleanWebpackPlugin = require("clean-webpack-plugin"),
      HTMLWebpackPlugin = require("html-webpack-plugin"),
      UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = merge(config, {
  output: {
    filename: "bundle.min.js"
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new HTMLWebpackPlugin({
      template: "src/templates/index.pug"
    }),
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      }
    })
  ]
});
