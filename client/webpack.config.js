const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./src/index.jsx'],
  mode: 'development',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'main.js',
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    index: 'public/index.html',
    disableHostCheck: true,
    host: '0.0.0.0',
    port: 5000,
    // proxy: {"/api/**": {target: 'http://server:3000', secure: false}}
  },
  module: {
    rules: [
      {
        exclude: /node_modules|packages/,
        test: /\.jsx$/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  plugins: [new HtmlWebpackPlugin(), new webpack.NamedModulesPlugin()],
};
