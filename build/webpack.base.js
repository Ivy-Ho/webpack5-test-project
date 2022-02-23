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
          inlineRequires: "/assets/",
          partialDirs: [path.join(__dirname, "src/partials")]
        }
      },
      {
        test: /\.(sass|scss|css)$/,
        use: devMode
          ? ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
          : [
              MiniCssExtractPlugin.loader,
              "css-loader",
              "postcss-loader",
              "sass-loader"
            ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      // {
      //   test: /.css$/i,
      //   use: devMode ? ['style-loader', 'css-loader'] : [ MiniCssExtractPlugin.loader, 'css-loader'],
      // },
      {
        test: /\.(woff|woff2|eot|ttf|otf|)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "font/[name].[ext]"
            }
          }
        ]
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
    // modules: [paths.src, 'node_modules'],
    // extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      // assets: paths.public,
    },
  },
};
