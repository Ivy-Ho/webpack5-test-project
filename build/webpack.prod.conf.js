console.log(process.env.NODE_ENV);

const { merge } = require("webpack-merge");

const baseWebpackConfig = require("./webpack.base.conf");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(baseWebpackConfig, {
  mode: "production",
  devtool: "source-map",
  output: {
    filename: "js/[name].[hash].js" // 覆蓋 baseWebpackConfig 設定
  },
  plugins: [new CleanWebpackPlugin()]
  // other production config
});
