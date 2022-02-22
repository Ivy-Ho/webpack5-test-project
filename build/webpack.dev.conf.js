console.log(process.env.NODE_ENV);

const path = require("path");

const { merge } = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");

module.exports = merge(baseWebpackConfig, {
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
