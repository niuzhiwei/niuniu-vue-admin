const webpackConfig = require('./webpack.common')
const merge = require('webpack-merge')
const webpack = require('webpack')
const config = require('../vue.config')
const portfinder = require('portfinder')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin') //更好的看到webpack警告和错误

const devConfig = merge(webpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [{
        test: /\.css$/,
        //loader执行顺序是：从后往前
        //postcss 兼容性
        use: ['vue-style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/,
        use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      //window.ENV = 'development'
      ENV: JSON.stringify('development')
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    compress: true,
    host: config.dev.host,
    port: config.dev.port,
    hot: true,
    inline: true,
    hotOnly: true, //当编译失败时，不刷新页面
    overlay: true, //用来在编译出错的时候，在浏览器页面上显示错误
    publicPath: '/', //一定要加
    open: config.dev.autoOpen,
    proxy: config.dev.proxyTable,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'https://www.fastmock.site/mock/84374715c999223c706a336d0d72dea5',
        changeOrigin: true,
      }
    },
    watchOptions: {
      // 不监听的文件或文件夹，支持正则匹配
      ignored: /node_modules/,
      // 监听到变化后等1s再去执行动作
      aggregateTimeout: 1000,
      // 默认每秒询问1000次
      poll: 1000
    }
  },
})

module.exports = new Promise((resolve, reject) => {
  // 设置插件的初始搜寻端口号
  portfinder.basePort = config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // 这里就利用 portfinder 得到了可以使用的端口
      devConfig.devServer.port = port
      devConfig.plugins.push(
        new FriendlyErrorsPlugin({
          // 清除控制台原有的信息
          clearConsole: true,
          compilationSuccessInfo: {
            messages: [`Your application is running here: http://${devConfig.devServer.host}:${port}`],
          }
        })
      )
      resolve(devConfig)
    }
  })
})