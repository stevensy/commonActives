var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var glob = require('glob')

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}
  // generate loader string to be used with extract text plugin
  function generateLoaders (loaders) {
    var sourceLoader = loaders.map(function (loader) {
      var extraParamChar
      if (/\?/.test(loader)) {
        loader = loader.replace(/\?/, '-loader?')
        extraParamChar = '&'
      } else {
        loader = loader + '-loader'
        extraParamChar = '?'
      }
      return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
    }).join('!')

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: sourceLoader,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader', sourceLoader].join('!')
    }
  }

  // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
  return {
    css: generateLoaders(['css']),
    postcss: generateLoaders(['css']),
    less: generateLoaders(['css', 'less']),
    sass: generateLoaders(['css', 'sass?indentedSyntax']),
    scss: generateLoaders(['css', 'sass']),
    stylus: generateLoaders(['css', 'stylus']),
    styl: generateLoaders(['css', 'stylus'])
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      loader: loader
    })
  }
  return output
}

//获取多级的入口文件
/**
* @Desc globPath 匹配的路径
* @Desc excludes 需要排除的路径 
*
**/
exports.getMultiEntry = function (globPath,excludes) {
  var entries = {},
    basename, tmp, pathname;

  glob.sync(globPath).forEach(function (entry) {
    //入口js必须为main.js
    if(excludes && excludes.length > 0){
      for(var i = 0 ; i < excludes.length ; i ++){
        if(entry.indexOf(excludes[i]) != -1) {
          return false;
        }
      }
    }
    basename = path.basename(entry, path.extname(entry));
    tmp = entry.split('/').splice(-4);
  
  var pathsrc = tmp[0]+'/'+tmp[1];
  if( tmp[0] == 'src' ){
    pathsrc = tmp[1];
  }
  //console.log(pathsrc)
    //pathname = pathsrc + '/' + basename; // 正确输出js和html的路径
    //entries[pathname] = entry;
    pathsrc = pathsrc.replace('./','')
    entries[pathsrc] = entry;
    //console.log(pathname+'-----------'+entry);
    
  });
  
  return entries;
  
}
