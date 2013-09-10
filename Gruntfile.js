module.exports = function( grunt ) {
  "use strict";

  grunt.loadNpmTasks( 'grunt-contrib-connect' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-contrib-copy' );
  grunt.loadNpmTasks( 'grunt-contrib-concat' );
  grunt.loadNpmTasks( 'grunt-contrib-clean' );
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
  grunt.loadNpmTasks( 'grunt-ngmin' );
  grunt.loadNpmTasks( 'grunt-html2js' );
  grunt.loadNpmTasks( 'grunt-strip' );
  grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
  grunt.loadNpmTasks('grunt-targethtml');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  grunt.registerTask( 'build', [
    'clean:build',
    'clean:tmp',
    'uglify:individual_js_vendor',
    'ngmin:app_js',
    'html2js:app_js',
    'concat:vendor_js',
    'strip',
    'uglify:app_js',
    'cssmin:app_css',
    'copy:fonts',
    'copy:img',
    'copy:config',
    'targethtml:build',
    'htmlmin:index',
    'clean:tmp'
  ] );

  grunt.registerTask( 'no-ripple', [
    'clean:index-no-ripple',
    'targethtml:no-ripple'
  ] );

  grunt.registerTask( 'server:src', [
    'connect:src:keepalive'
  ] );

  grunt.registerTask( 'server:build', [
    'connect:build:keepalive'
  ] );

  grunt.registerTask( 'server:no-ripple', [
    'connect:no-ripple:keepalive'
  ] );


  var LIVERELOAD_PORT = 35729;
  var mountFolder = function ( connect, dir ) {
    return connect.static( require( 'path' ).resolve( dir ) );
  };
  var modRewrite = require( 'connect-modrewrite' );
  var modRewriteFiletypes = [
    '.html',
    '.js',
    '.css',
    '.swf',
    '.jp(e?)g',
    '.png',
    '.gif',
    '.xml',
    '.svg',
    '.eot',
    '.ttf',
    '.woff'
  ];
  var modRewriteRegExp = '!\\' + modRewriteFiletypes.join('|\\');
  var userConfig = require( './build.config.js' );
  var pkg = grunt.file.readJSON('package.json');

  var taskConfig = {

    pkg: pkg,

    meta: {
      banner:
      '/**\n' +
      ' * <%= pkg.name %>\n' +
      ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
      ' * @version <%= pkg.version %>\n' +
      ' */\n'
    },

    connect: {
      src: {
        options: {
          port: 9001,
          base: 'src',
          livereload: LIVERELOAD_PORT,
          middleware: function ( connect ) {
            return [
              modRewrite( [
                modRewriteRegExp + '$ /index.html'
              ] ),
              mountFolder( connect, 'src' )
            ];
          }
        }
      },
      build: {
        options: {
          port: 9002,
          base: 'www',
          livereload: LIVERELOAD_PORT,
          middleware: function ( connect ) {
            return [
              modRewrite( [
                modRewriteRegExp + '$ /index.html'
              ] ),
              mountFolder( connect, 'www' )
            ];
          }
        }
      },
      "no-ripple": {
        options: {
          port: 9003,
          base: 'src',
          livereload: LIVERELOAD_PORT,
          middleware: function ( connect ) {
            return [
              modRewrite( [
                modRewriteRegExp + '$ /index.no-ripple.html'
              ] ),
              mountFolder( connect, 'src' )
            ];
          }
        }
      }
    },
    watch: {
      index: {
        files: 'src/index.html',
        tasks: [ 'clean:index-no-ripple', 'targethtml:no-ripple' ],
        options: {
          livereload: LIVERELOAD_PORT
        }
      },
      html: {
        files: [
          'src/**/*.html',
          '!src/index.html',
          '!src/index.no-ripple.html'
        ],
        tasks: [],
        options: {
          livereload: LIVERELOAD_PORT
        }
      },
      css: {
        files: 'src/css/**/*.css',
        tasks: [],
        options: {
          livereload: LIVERELOAD_PORT
        }
      },
      fonts: {
        files: 'src/fonts/**/*',
        tasks: [],
        options: {
          livereload: LIVERELOAD_PORT
        }
      },
      img: {
        files: 'src/img/**/*',
        tasks: [],
        options: {
          livereload: LIVERELOAD_PORT
        }
      },
      js: {
        files: [
          'src/app/**/*.js',
          'src/common/**/*.js',
          'src/vendor/**/*.js'
        ],
        tasks: [],
        options: {
          livereload: LIVERELOAD_PORT
        }
      }
    },

    copy: {
      fonts: {
        files: [
          {
            expand: true,
            flatten: false,
            src: ['**/*'],
            cwd: 'src/fonts',
            dest: '<%= build_dir %>/fonts',
            filter: 'isFile'
          }
        ]
      },
      img: {
        files: [
          {
            expand: true,
            flatten: false,
            src: ['**/*'],
            cwd: 'src/img',
            dest: '<%= build_dir %>/img',
            filter: 'isFile'
          }
        ]
      },
      config: {
        files: [
          {
            src: ['src/config.xml'],
            dest: '<%= build_dir %>/config.xml'
          }
        ]
      }
    },

    clean: {
      build: [ '<%= build_dir %>/' ],
      tmp: [ '<%= tmp_dir %>' ],
      "index-no-ripple": [ 'src/index.no-ripple.html' ]
    },

    uglify: {
      app_js: {
        options: {
          mangle: true,
          preserveComments: 'some',
          banner: '<%= meta.banner %>'
        },
        files: {
          '<%= build_dir %>/<%= app_js %>': [
            '<%= tmp_dir %>/js/vendor.js',
            '<%= tmp_dir %>/js/src/**/*.js'
          ]
        }
      },
      individual_js_vendor: {
        options: {
          mangle: true,
          preserveComments: 'some'
        },
        src: [
          '<%= individual_files.vendor_js %>'
        ],
        dest: '<%= build_dir %>/js',
        expand: true,
        cwd: 'src',
        flatten: false,
        filter: 'isFile'
      }
    },

    ngmin: {
      app_js: {
        expand: true,
        cwd: '.',
        src: [ '<%= app_files.js %>' ],
        dest: '<%= tmp_dir %>/js'
      }
    },

    html2js: {
      options: {
        base: 'src'
      },
      app_js: {
        src: [ '<%= app_files.tpl %>' ],
        dest: '<%= tmp_dir %>/js/src/app/<%= app_templates_module %>.js',
        module: '<%= app_templates_module %>'
      }
    },

    strip : {
      app_js: {
        expand: true,
        cwd: '<%= tmp_dir %>/js',
        src: [ '<%= app_files.js %>' ],
        dest: '<%= tmp_dir %>/js'
      },
      vendor_js: {
        src: [ '<%= tmp_dir %>/js/vendor.js' ],
        dest: '<%= tmp_dir %>/js/vendor.js'
      }
    },

    concat: {
      vendor_js: {
        src: ['<%= vendor_files.js %>'],
        dest: '<%= tmp_dir %>/js/vendor.js'
      }
    },

    cssmin: {
      app_css: {
        options: {
          banner: '<%= meta.banner %>',
          keepSpecialComments: '*'
        },
        files: {
          '<%= build_dir %>/<%= app_css %>': [ '<%= app_files.css %>' ]
        }
      }
    },

    targethtml: {
      build: {
        files: {
          '<%= tmp_dir %>/index.html': [
            '<%= app_files.index %>'
          ]
        }
      },
      "no-ripple": {
        files: {
          'src/index.no-ripple.html': [
            '<%= app_files.index %>'
          ]
        }
      }
    },

    htmlmin: {
      index: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          '<%= build_dir %>/index.html': '<%= tmp_dir %>/index.html'
        }
      }
    }

  };

  grunt.initConfig( grunt.util._.extend( taskConfig, userConfig ) );

};