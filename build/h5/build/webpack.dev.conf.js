var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  console.log('baseWebpackConfig.entry[name]:' + baseWebpackConfig.entry[name])
  baseWebpackConfig.entry[name] = ['./build/h5/build/dev-client'].concat(baseWebpackConfig.entry[name])
})



module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env,
      'DEBUG': true
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
/*    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),*/
    new FriendlyErrorsPlugin()
  ]
})

var pages =  utils.getMultiEntry('./**/index.shtml',['build','test','node_modules']);
console.log('pages')
console.log(pages)

for (var pathname in pages) {
  // 配置生成的html文件，定义路径等
  console.log('pathname:' + pathname)
  var conf = {
    filename: './'+ pathname + '/index.html',
    template: pages[pathname], // 模板路径
    chunks: [pathname], // 每个html引用的js模块
    inject: true              // js插入位置
  };
  // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
  module.exports.plugins.push(new HtmlWebpackPlugin(conf));
}