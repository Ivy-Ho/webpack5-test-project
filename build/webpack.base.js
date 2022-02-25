const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";
console.log(devMode);

module.exports = {
  context: path.resolve(__dirname, "../"),
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "js/[name].js"
  },
  module: {
    rules: [
      {
        test: /.(hbs|handlebars)$/i,
        loader: "handlebars-loader",
        options: {
          inlineRequires: "/img/", //放圖片資源的資料夾叫什麼名字   //沒 inlineRequire話，會用到相對路徑，build出來依經驗會問題，除非所有東西都用直接從根目錄出發
          partialDirs: [path.join(__dirname, "src/partials")]
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: devMode
          ? ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
          : [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
      },
      // {
      //   test: /.css$/i,
      //   use: devMode ? ['style-loader', 'css-loader'] : [ MiniCssExtractPlugin.loader, 'css-loader'],
      // },

      {
        test: /.(png|jpe?g|webp|svg|woff2?|ttf)$/i,
        type: 'asset',    //與 'asset/resource' 的差別   // https://webpack.js.org/guides/asset-modules/
        parser: {
          /**
           * 自動判斷超過 4kb 就用base64注入
           */
          dataUrlCondition: {
            maxSize: 4 * 1024
          }
        }
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/pages/index.hbs",
      filename: "index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash].css"
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          name: "vendors",
          enforce: true,
          minSize: 70000, // 限制最小大小 ( byte )
          priority: 10 // 預設為 0，必須大於預設 cacheGroups
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
};
