const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const config = {
  entry: [
    path.resolve(__dirname, 'src/js/app.js'),
    path.resolve(__dirname, 'src/sass/app.scss')
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].css',
              outputPath: 'css'
            }
          },
          {
            loader: 'extract-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'img/[name].[ext]'
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
  output: {
    filename: 'js/app.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '../'
  }
}

module.exports = (env, argv) => {
  const isPrd = argv.mode === 'production'

  config.plugins.push(
    new OptimizeCSSAssetsPlugin({})
  )

  return {
    devtool: isPrd ? 'source-map' : 'inline-source-map',
    mode: isPrd ? 'production' : 'development',
    ...config
  }
}
