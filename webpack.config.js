const path = require("path");

module.exports = {
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        include: path.join(__dirname, "src")
      },
      {
        test: /\.pug$/,
        loader: "pug-loader",
        query: {
          "pretty": true
        }
      }
    ]
  }
}
