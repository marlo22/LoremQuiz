const config = require("./webpack.config.js"),
      merge = require("webpack-merge"),
      path = require("path"),
      CleanWebpackPlugin = require("clean-webpack-plugin"),
      HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(config, {
  output: {
    filename: "bundle.js"
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "src/templates/index.pug"
    })
  ]
});
