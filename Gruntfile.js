module.exports = function( grunt ) {
  "use strict";

  grunt.loadNpmTasks( 'grunt-contrib-connect' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );

  var LIVERELOAD_PORT = 35729;
  var mountFolder = function ( connect, dir ) {
    return connect.static( require( 'path' ).resolve( dir ) );
  };
  var modRewrite = require( 'connect-modrewrite' );
  var userConfig = require( './build.config.js' );

  grunt.initConfig({

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

    uglify: {
      app: {
        files: {
          './<%= build_dir %>/js/app.js': [
            'src/app/**/*.js',
            'src/common/**/*.js',
            '!src/**/*.spec.js'
          ]
        }
      }
    }

  });
};