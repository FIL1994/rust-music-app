"use strict";

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require("path");

const isProduction = String(process.env.NODE_ENV).includes("production");

module.exports = {
  entry: ["@babel/polyfill", "./src/index.js"],
  output: {
    path: path.resolve(__dirname, "dist")
  },
  externals: {
    electron: "electron"
  },
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: [/\.css$/, /\.less$/],
        use: [
          !isProduction ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader"
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    port: 8080,
    contentBase: "./"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};
