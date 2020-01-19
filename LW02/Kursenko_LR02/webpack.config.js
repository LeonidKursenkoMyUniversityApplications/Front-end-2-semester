const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractLess = new ExtractTextPlugin({
    filename: "[name].css",
    //disable: process.env.NODE_ENV === "development"
});

module.exports = {
  entry: ["./index.js", "./index.less"],
  output: {
    filename: "bundle.js"
  },
  
  // watch: true, // пересборка автоматически при изменениях
  // watchOptions: {
  //  aggregateTimeout: 100 // кол-во миллисикунд после сохранения (по умолчанию 300)
  // },

  devtool: "source-map", // создание source-map для отладки
  module: {
    rules: [
      // https://webpack.js.org/loaders/babel-loader/
      // npm i babel-core babel-loader babel-preset-env --save-dev
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
      // https://webpack.js.org/loaders/css-loader/
      // npm i -D css-loader
      // https://webpack.js.org/loaders/style-loader/
      // npm i -D style-loader 
      {test: /\.less$/, use: extractLess.extract({
            fallback: "style-loader",
            use: ["css-loader", "less-loader"]
        })
      }
    ]
  },
  devServer: {
      historyApiFallback: true,
      noInfo: true,
      overlay: true
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./index.html",
      filename: "index.html"
    }),
    extractLess
  ]
};
