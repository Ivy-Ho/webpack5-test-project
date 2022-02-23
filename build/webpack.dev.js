console.log(process.env.NODE_ENV);

const path = require("path");

const { merge } = require("webpack-merge");
const common = require("./webpack.base");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "/src")
    },
    compress: false,
    hot: true,
    liveReload: true,
    port: 9090,
    open: true,
    client: {
      overlay: false
    }
  }
});
