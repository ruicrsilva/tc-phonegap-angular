module.exports = function( grunt ) {
  "use strict";

  grunt.loadNpmTasks( 'grunt-contrib-connect' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-contrib-copy' );
  grunt.loadNpmTasks( 'grunt-contrib-clean' );
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
  grunt.loadNpmTasks( 'grunt-ngmin' );
  grunt.loadNpmTasks( 'grunt-html2js' );

  var LIVERELOAD_PORT = 35729;
  var mountFolder = function ( connect, dir ) {
    return connect.static( require( 'path' ).resolve( dir ) );
  };
  var modRewrite = require( 'connect-modrewrite' );
  var userConfig = require( './build.config.js' );

  var taskConfig = {

    pkg: grunt.file.readJSON('package.json'),

    meta: {
      banner:
      '/**\n' +
      ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
      ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
      ' * Dual licensed with the Apache-2.0 or MIT license.\n' +
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
      }
    },

    watch: {
      html: {
        files: 'src/**/*.html',
        tasks: [],
        options: {
          livereload: LIVERELOAD_PORT
        }
      }
    },

    copy: {
      build_appjs: {
        files: [
          {
            src: [ '<%= app_files.js %>' ],
            dest: '<%= build_dir %>/',
            cwd: '.',
            expand: true
          }
        ]
      }
    },

    clean: {
      build: [ '<%= build_dir %>/' ]
    },

    uglify: {
      app: {
        options: {
          mangle: true,
          sourceMap: 'tmp/build-source-map.js'
        },
        files: {
          '<%= build_dir %>/js/app.js': [
            '<%= vendor_files.js %>',
            '<%= build_dir %>/tmp/js/**/*.js'
          ]
        }
      }
    },

    ngmin: {
      build: {
        expand: true,
        cwd: '.',
        src: [ '<%= app_files.js %>' ],
        dest: '<%= build_dir %>/tmp/js'
      }
    },

    html2js: {
      options: {
        base: 'src'
      },
      build: {
        src: [ '<%= app_files.tpl %>' ],
        dest: '<%= build_dir %>/tmp/js/src/app/app-templates.js',
        module: 'app-templates'
      }
    }

  };

  grunt.initConfig( grunt.util._.extend( taskConfig, userConfig ) );

};