## 步骤

1. cnpm install 或者npm install 下载依赖
2. npm run build 开始构建
3. 参数说明npm run build -- options[moduleName] 构建单个模块
  `示例构建单个模块  npm run build -- cart
      构建多个模块   npm run build -- cart,pay
      构建所有配置模块 npm run build`

##  build执行内容
1.  构建所有配置模块中的内容分别npm install&&npm run build
2.  拷贝所有内容到输出目录wap对应目录中
3.  构建压缩备份，供回滚使用

##  config说明
1.  文件位置 bulid/config.js
2.  src 为对应要构建的模块name与源文件名一致,path为源文件构建目录
3.  dis为输出目录，目前为testWap统计wap目录


## Todo
单个模块构建配置


## H5集成开发环境
1. 加载依赖库文件 npm install 或者cnpm install
2. 启动命令 npm run h5-dev
3. 环境 npm run h5-dev pre

```
说明：
    1.  如开发的模块有公共模块中未依赖的模块，使用集成开发命令时需要将依赖拷贝置testWap/package.json中
    2. 加载本地依赖时不要使用别名，使用相对路径
    3. 启动时如需打开指定首页，在dev-server.js中修改如下代码即可，可指定登录或者home页面为首页
    opn(uri + '/cart/index.html')
```
