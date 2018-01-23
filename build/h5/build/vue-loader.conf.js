var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'
const px2rem = require('postcss-px2rem')
module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  })/*,
  postcss: [
    require('autoprefixer')({browsers: ['> 1%', 'ie >= 9', 'iOS >= 6', 'Android >= 2.1']}), px2rem({remUnit: 75})
  ]*/
}
