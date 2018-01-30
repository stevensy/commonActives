var fs = require( 'fs' ),
    stat = fs.stat;
var config = require('./config')
/*
 * 复制目录中的所有文件包括子目录
 * @param{ String } 需要复制的目录
 * @param{ String } 复制到指定的目录
 */
var copy = function( src, dst ){
    // 读取目录中的所有文件/目录
    if(fs.existsSync(dst)){
        emptyDir(dst)
    }
    fs.mkdir(dst)
    fs.readdir( src, function( err, paths ){
        if( err ){
            throw err;
        }
        paths.forEach(function( path ){
            var _src = src + '/' + path,
                _dst = dst + '/' + path,
                readable, writable;
            stat( _src, function( err, st ){
                if( err ){
                    throw err;
                }
                // 判断是否为文件
                if( st.isFile()){
                    if(isExlude(path)){
                      return true
                    }
                    //console.log('当前拷贝文件:    ' + path)
                    // 创建读取流
                    readable = fs.createReadStream( _src );
                    // 创建写入流
                    writable = fs.createWriteStream( _dst );
                    // 通过管道来传输流
                    readable.pipe( writable );
                }
                // 如果是目录则递归调用自身
                else if( st.isDirectory() ){
                    exists( _src, _dst, copy );
                }
            });
        });
    });
};
// 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
var exists = function( src, dst, callback ){
    fs.exists( dst, function( exists ){
        // 已存在
        if( exists ){
            callback( src, dst );
        }
        // 不存在
        else{
            fs.mkdir( dst, function(){
                callback( src, dst );
            });
        }
    });
};
var isExlude = function(path){
  var exclude = config.exclude
  if(exclude && exclude.length > 0){
    for(var i = 0 ; i < exclude.length ; i ++){
      if(path.match(exclude[i])){
        return true
      }
    }
  }
  return false
}

var emptyDir = function(fileUrl){
    var files = fs.readdirSync(fileUrl);//读取该文件夹
    files.forEach(function(file){
        var stats = fs.statSync(fileUrl+'/'+file);
        if(stats.isDirectory()){
            emptyDir(fileUrl+'/'+file);
        }else{
            fs.unlinkSync(fileUrl+'/'+file);
            //console.log("删除文件"+fileUrl+'/'+file+"成功");
        }
    });
    fs.rmdirSync(fileUrl)
}
module.exports = copy
