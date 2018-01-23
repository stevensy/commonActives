var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var webpack = require("webpack")
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

var entries =  utils.getMultiEntry('./**/src/main.js',['build','test','node_modules']); // 获得入口js文件
var bableMdules = [];
for (var entry in entries) {
  bableMdules.push(resolve('../../' + entry))
}
console.log('entry:')
console.log(entries)
module.exports = {
  entry: entries,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      resolve('../../src'),
      resolve('../../node_modules')
    ],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'src': resolve('src'),
      'assets': resolve('src/assets'),
      'components': resolve('src/components')
    }
  },
  module: {
    rules: [
     /* {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: "pre",
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },*/
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
            test: /\.less$/,
            //提取公共scss
            //loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader!postcss-loader")
            loader: 'style-loader!css-loader!less-loader!postcss-loader'
        },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: bableMdules
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('[name]/static/img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('[name]/static/fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
/*new webpack.optimize.CommonsChunkPlugin('common.js'),
new webpack.ProvidePlugin({
jQuery: "jquery",
$: "jquery"
})*/
]
}
