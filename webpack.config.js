const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    assetModuleFilename: '[name][ext]',
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, './src'),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg)$/i,
        type: 'assets'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'MemoryGame',
      filename: 'index.html',
      template: 'src/index.html'
    })
  ]
}