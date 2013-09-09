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
    'targethtml:build',
    'htmlmin:index',
    'clean:tmp'
  ] );




  var LIVERELOAD_PORT = 35729;
  var mountFolder = function ( connect, dir ) {
    return connect.static( require( 'path' ).resolve( dir ) );
  };
  var modRewrite = require( 'connect-modrewrite' );
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
      ' * @license <%= license %>\n' +
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
                '!\\.html|\\.js|\\.css|\\.swf|\\.jp(e?)g|\\.png|\\.gif$ /index.html'
              ] ),
              mountFolder( connect, 'src' )
            ];
          }
        }
      },
      build: {
        options: {
          port: 9002,
          base: 'build',
          livereload: LIVERELOAD_PORT,
          middleware: function ( connect ) {
            return [
              modRewrite( [
                '!\\.html|\\.js|\\.css|\\.swf|\\.jp(e?)g|\\.png|\\.gif$ /index.html'
              ] ),
              mountFolder( connect, 'build' )
            ];
          }
        }
      }
    },

    watch: {
      html: {
        files: 'src/**/*.html',
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
      }
    },

    clean: {
      build: [ '<%= build_dir %>/' ],
      tmp: [ '<%= tmp_dir %>' ]
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
        dest: '<%= build_dir %>/js/vendor',
        expand: true,
        flatten: true,
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