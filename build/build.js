const exec = require('child_process').exec;
const execSync = require('child_process').execSync;

var util = require('./util')
var config = require('./config')
var copy = require('./copy')
var fs = require('fs')
var archiver = require('archiver')
var path = require('path')

/*exec('cd cart && npm run build', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});
exec('cd pay && npm run build', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});*/
//execSync('cd cart && npm run build');
//execSync('cd pay && npm run build');
function checkEnv(){
  var evn = '', m = process.argv[2], t = process.argv[3];
  if(/sit|pre|prod/.test(m)){
     evn = m;
  }else if(/sit|pre|prod/.test(t)){
     evn = t;
  }else if(typeof evn == "undefined" || typeof t == "undefined"){
     evn = "sit";
  }else{
     evn = "sit"
  }
  return evn;
}
var argv = checkEnv();
 
var bulidModules = config.src
if(!/sit|pre|prod/.test(process.argv[2])){
  var modules = process.argv[2].split(',')
  console.log('modules.length:' + modules.length)
  var needBulids = []
  for(var i = 0 ; i < modules.length ; i ++){
    for(var j = 0 ; j < config.src.length ; j ++){
      if(modules[i] == config.src[j].name){
        needBulids.push(config.src[j])
        break;
      }
    }
  }
  bulidModules = needBulids;
}
bulidModules.forEach(function(f){
  var commond = 'cd '+f.name;
  var node_modules_file = path.resolve(__dirname,'../'+f.name + '/node_modules')
  console.log('文件夹:' + node_modules_file)
  if(!fs.existsSync(node_modules_file)){
    console.log(f.name + '模块需要执行npm install')
    commond +=' && npm install'
  }

  commond += ' && npm run build ' + argv;
  console.log('开始构建:' + f.name +' 模块' + commond)
  var stdout = execSync(commond)
  console.log(`stdout: ${stdout}`);
  console.log('完成构建:' + f.name +' 模块')
})

//项目打包好的目录dist 复到 wap 中
bulidModules.forEach(function(f){
  // console.log('   正在拷贝:   ' + f.path)
  var distName = f.distName ? f.distName :  f.name;
  copy(f.path,config.dist.path + '/' + distName)
})

//打包
var timestamp = new Date().Format("yyyyMMddhhmmss");
var backupOutputPath = path.resolve(__dirname, '../backupWap/wap' + timestamp + '.zip')
var backupOutput = fs.createWriteStream(backupOutputPath);
var archive = archiver('zip', {
    store: true // Sets the compression method to STORE.

});

// listen for all archive data to be written
backupOutput.on('close', function() {
  console.log(archive.pointer() + ' 总字节');
  // console.log(JSON.stringify(config))
  // console.log('   开始拷贝文件...')
});

// 捕获压缩异常
archive.on('error', function(err) {
  throw err;
});
 
archive.pipe(backupOutput);

archive.directory(path.resolve(__dirname, '../wap'),'wap', true);
  
archive.finalize();
 
