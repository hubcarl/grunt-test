module.exports = function (grunt) {
  //load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  var ngmshell = require('ngmshell');

  var cfg = {
    src: 'src',
    // Change 'localhost' to '0.0.0.0' to access the server from outside.
    serverHost: '0.0.0.0',
    serverPort: 9000,
    livereload: 35729
  };

  //grunt config
  grunt.initConfig({
    //======== 配置相关 ========
    pkg: grunt.file.readJSON('package.json'),
    cfg: cfg,

    //======== 开发相关 ========
    //开启服务
    connect: {
      options: {
        port: cfg.serverPort,
        hostname: cfg.serverHost,
        middleware: function (connect, options) {
          return [
            require('connect-livereload')({
              port: cfg.livereload
            }),
            // Serve static files.
            connect.static(options.base),
            // Make empty directories browsable.
            connect.directory(options.base)
          ];
        }
      },
      server: {
        options: {
          // keepalive: true,
          base: cfg.src
        }
      }
    },

    //打开浏览器
    open: {
      server: {
        url: 'http://localhost:' + cfg.serverPort
      }
    },

    //监控文件变化
    watch: {
      options: {
        livereload: cfg.livereload
      },
      server: {
        files: [cfg.src + '/**']
      }
    },

    clean: {
      src: 'dist/*',
      image: 'dist/image',
      css: 'dist/css',
      script: 'dist/script'
    },

    copy: {
      src: {
        files: [
          {expand: true, cwd: 'src', src: ['*'], dest: 'dist'}
        ]
      },
      css: {
        files: [
          {expand: true, cwd: 'src', src: ['css'], dest: 'dist'}
        ]
      },
      image: {
        files: [
          {expand: true, cwd: 'src', src: ['image'], dest: 'dist'}
        ]
      },
      script: {
        files: [
          {expand: true, cwd: 'src', src: ['script/*.js'], dest: 'dist'}
        ]
      }
    },

    // 文件压缩合并
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'//添加banner
      },
      //压缩buildutils.js，不混淆变量名，保留注释，添加banner和footer
      utils: {
        options: {
          mangle: false, //不混淆变量名
          preserveComments: 'all', //不删除注释，还可以为 false（删除全部注释），some（保留@preserve @license @cc_on等注释）
          footer: '\n/*! <%= pkg.name %> 最后修改于： <%= grunt.template.today("yyyy-mm-dd") %> */'//添加footer
        },
        files: {
          'dist/script/min/utils.min.js': ['src/script/utils.js']
        }
      },
      //压缩xml.js，输出压缩信息
      xml: {
        options: {
          report: "min"//输出压缩率，可选的值有 false(不输出信息)，gzip
        },
        files: {
          'dist/script/min/xml.min.js': ['src/script/xml.js']
        }
      },
      //按原文件结构压缩js文件夹内所有JS文件
      all: {
        files: [
          {
            expand: true,
            cwd: 'src/script',//js目录下
            src: '*.js',//所有js文件
            dest: 'dist/script/all'//输出到此目录下
          }
        ]
      },
      //合并压缩utils.js和xml.js 为lib.min.js
      release: {
        files: {
          'dist/script/lib.min.js': ['src/script/utils.js', 'src/script/xml.js']
        }
      }
    }

  });


  grunt.registerTask('open', function () {
    var url = 'http://localhost:' + cfg.serverPort;
    ngmshell.open(url, true);
  });

  //定义任务
  grunt.registerTask('server', ['connect:server', 'open', 'watch:server']);
  grunt.registerTask('html:clean', ['clean:src', 'clean:css', 'clean:image', 'clean:script']);
  grunt.registerTask('html:copy', ['copy:src', 'copy:css', 'copy:image', 'copy:script']);
  grunt.registerTask('dev', ['html:clean', 'html:copy', 'server']);

  // 文件压缩合并
  grunt.registerTask('min', ['html:clean','uglify:utils', 'uglify:xml','uglify:all', 'uglify:release']);












  grunt.registerTask('mytask', '一个最简单的任务演示，根据参数打印不同的输出.', function (arg1, arg2) {
    if (arguments.length === 0) {
      grunt.log.writeln('任务' + this.name + ", 没有传参数");
    } else if (arguments.length === 1) {
      grunt.log.writeln('任务' + this.name + ", 有一个参数是" + arg1);
    } else {
      grunt.log.writeln('任务' + this.name + ", 有两个参数分别是" + arg1 + ", " + arg2);
    }
  });

  // 运行 grunt 输出: 任务mytask, 有两个参数分别是param1, param2
  grunt.registerTask('default', '默认的任务', function () {
    // 调用mytask
    grunt.task.run('mytask:param1:param2')
  });

  // 调用多个任务，以逗号分隔传给run方法即可，或者以数组形式
  grunt.registerTask('_default', '默认的任务', function () {
    grunt.task.run('mytask1', 'mytask2');
    // 或者
    grunt.task.run(['mytask1', 'mytask2']);
  })

  // grunt.loadNpmTasks('grunt-contrib-copy');
  // grunt.loadNpmTasks('grunt-contrib-connect');

};
