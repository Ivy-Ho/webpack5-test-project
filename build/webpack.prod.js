console.log(process.env.NODE_ENV);

const { merge } = require("webpack-merge");

const common = require("./webpack.base");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  output: {
    filename: "js/[name].[hash].js" // 覆蓋 common 設定
  },
  plugins: [new CleanWebpackPlugin()]
  // other production config
});
