const webpackConfig = require('./webpack.common')
const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const config = require('../vue.config')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')     //清除dist
const MiniCssExtractPlugin = require("mini-css-extract-plugin")   //提取css
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')    //缓存第三方模块
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const prodConfig = merge(webpackConfig, {
  mode: "production",
  devtool: 'none',
  module: {
    rules: [
      //抽离css
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            }
          }, 'css-loader', 'postcss-loader'],
      },
      //抽离less->css
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            }
          }, 'css-loader', 'postcss-loader', 'less-loader'],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    //针对npm中的第三方模块优先采用jsnext:main中指向的es6模块化语法的文件
    mainFields: ['jsnext:main', 'browser', 'main']
  },
  plugins: [
    new CleanWebpackPlugin(),//默认清空output.path的文件夹
    new webpack.DefinePlugin({
        //window.ENV = 'production'
        ENV: JSON.stringify('production')
    }),
    //抽离css
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[name].[hash].css',
    }),
    //对比修改了哪些配置，只去打包修改过了的配置
    new HardSourceWebpackPlugin(),
    //使用ParallelUglifyPlugin并行压缩输出js代码
    //传递给UglifyJS的参数
    //还是使用UglifyJS压缩，只不过帮助开启了多进程
    new ParallelUglifyPlugin({
       uglifyJS:{
           output:{
               beautify:false,//最紧凑的输出
               comments:false//删除所有的注释
           },
           compress:{
               //删除所有的console语句，可以兼容ie浏览器
               drop_console:true,
               //内嵌定义但是只用到一次的变量
               collapse_vars:true,
               //提取出出现多次但是没有定义成变量去引用的静态值
               reduce_vars:true
           }
       }
    }),
    //开启Scope hosting
    new ModuleConcatenationPlugin(),
    //vue使用cdn
    // new HtmlWebpackExternalsPlugin({
    //   externals:[{
    //     module:'vue',
    //     entry:'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
    //     global:'Vue'
    //   }]
    // }),
  ],
  optimization: {
    //压缩css
    minimizer: [new TerserJSPlugin({}), new OptimizeCssAssetsPlugin({})],
    //分割代码块
    splitChunks: {
    /**
    * initial入口chunk,对于异步导入的文件不处理
    * async 异步chunk，只对异步导入的文件处理
    * all 全部chunk
    */
      chunks: 'all',
      //缓存分组
      cacheGroups: {
        //第三方模块
        vendors: {
          name: 'vendors',//chunk名称
          test: /[\\\/]node_modules[\\\/]/,
          priority: 1,//权限更高，优先抽离，重要！
          chunks: 'initial',
          minSize: 0, //大小限制
          minChunks: 1 //最少复用过几次
        },
        //公共的模块
        common: {
          name: 'chunk-common',//chunk名称
          minChunks: 2,// 公共模块最少复用过几次
          priority: 0,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    },
  }
})
//g-zip压缩可以将已经压缩过的js，css再压缩一遍，减少了打包大小（需要nginx配置）
if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')
  prodConfig.plugins.push(
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp("\\.(" + config.build.productionGzipExtensions.join("|") + ")$"),
      threshold: 10240, // 只有大小大于10k的资源会被处理
      minRatio: 0.6 // 压缩比例，值为0 ~ 1
    })
  )
}
//打包大小分析(npm run build --report就会弹出一个页面，里面就是打包大小分析)
if (process.env.npm_config_report) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  prodConfig.plugins.push(
    new BundleAnalyzerPlugin()
  )
}


module.exports = prodConfig