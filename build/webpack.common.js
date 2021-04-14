const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') //这里引入插件
const vueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin') // 复制文件
const config = require('../vue.config')
const webpack = require('webpack')
const HappyPack = require('happypack') //单进程转多进程
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length
})

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  mode: 'development',
  entry: {
    index: path.resolve(__dirname, '../src/main.js')
  },
  output: {
    filename: 'js/[name].[hash:8].js',
    path: path.resolve(__dirname, '../dist'),
    chunkFilename: 'js/[name].[hash:8].js', //异步加载模块
    publicPath: config.publicPath
  },
  externals: {
    'AMap': 'AMap',
    'AMapUI': 'AMapUI'
  },
  module: {
    noParse: /jquery/,
    rules: [{
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader',
          options: {
            compilerOptions: {
              preserveWhitespace: false
            }
          }
        }]
      },
      //把对js文件的处理转交给id为happyBabel的happypack实例
      {
        test: /\.js$/,
        use: ['happypack/loader?id=happyBabel'],
        exclude: /node_modules/,
        include: [resolve('src'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(jpe?g|png|gif)$/i, //图片文件
        use: [{
          loader: 'url-loader',
          options: {
            //小于10Kb的图片用base64格式产出
            limit: 10 * 1024,
            esModule: false,
            fallback: {
              loader: 'file-loader',
              options: {
                name: 'img/[name].[hash:8].[ext]',
                publicPath: '../'
              }
            }
          }
        }]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10240,
            fallback: {
              loader: 'file-loader',
              options: {
                name: 'media/[name].[hash:8].[ext]',
                publicPath: '../'
              }
            }
          }
        }]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10240,
            fallback: {
              loader: 'file-loader',
              options: {
                name: 'font/[name].[hash:8].[ext]',
                publicPath: '../'
              }
            }
          }
        }]
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    },
    extensions: ['.js', '.vue', '.json'],
  },
  //插件注入
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      favicon: path.resolve(__dirname, '../public/favicon.ico'),
      //chunks表示该页面要引用哪些chunk(即上面的index)
      chunks: ['index', 'vendors', 'chunk-commo'] //要考虑代码分割
    }),
    //happypack开启多进程打包
    new HappyPack({
      //用唯一的标识符id来代表当前的happypack是用来处理一类特定的文件
      id: 'happyBabel',
      //如何处理.js文件，用法和loader配置中一样
      loaders: ['babel-loader?cacheDirectory'],
      threadPool: happyThreadPool
    }),
    new vueLoaderPlugin(),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, '../public'),
        to: path.resolve(__dirname, '../dist')
      }]
    }),
  ]
}