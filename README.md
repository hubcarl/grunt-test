
### 初始化说明

1. 安装[nodejs](http://nodejs.org) -- 下载对应版本并安装
2. 安装[grunt](http://gruntjs.com) -- 命令行下执行:npm install -g grunt-cli
4. 安装依赖库 -- 命令行到项目根目录,执行 npm install

### 开发说明

1. 命令行执行grunt dev
2. 将启动内置web服务, 监控dist目录
3. 将自动打开浏览器显示首页


### Grunt & Bower & NPM 使用

1安装bower全局环境
npm install -g bower

2帮助命令
bower help命令

3 Bower提供了几种方式用于安装包，所有包都将默认安装到components目录中。
    # Using the dependencies listed in the current directory's bower.json
    bower install
    # Using a local or remote package
    bower install <package>
    >> bower install https://github.com/aui/artTemplate.git
    # Using a specific Git-tagged version from a remote package
    bower install <package>#<version>


4 执行bower list命令可以列出所有本地安装的包。

5 只需执行bower search命令即可列出所有已经注册的包。

6 卸载已经安装到本地的包：bower uninstall <package-name>

7 通过bower init命令，进入交互式界面创建一个bower.json文件：

