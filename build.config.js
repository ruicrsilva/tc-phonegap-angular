module.exports = {

  app_files: {
    js: [
      'src/app/**/*.js',
      'src/common/**/*.js',
      '!src/**/*.spec.js',
      '!src/**/*Spec.js'
    ],
    jsUnit: [
      'src/**/*.spec.js',
      'src/**/*Spec.js'
    ],
    tpl: [
      'src/app/**/*.tpl.html',
      'src/common/**/*.tpl.html'
    ],
    index: 'src/index.html',
    css: [
      'src/css/**/*.css'
    ]
  },

  vendor_files: {
    js: [
      'src/vendor/polyfills/Array.js',
      'src/vendor/angular/angular.js',
      'src/vendor/angular-ui-router/angular-ui-router.js',
      'src/vendor/angular-ui-utils/route/route.js'
    ]
  },

  individual_files: {
    vendor_js: [
      'src/vendor/html5shiv/html5shiv.js',
      'src/vendor/json2/json2.js'
    ]
  },

  license: 'Dual licensed with the Apache-2.0 or MIT license',

  build_dir: 'build',

  tmp_dir: 'tc-build-tmp',

  app_js: 'js/app.js',

  app_css: 'css/app.css',

  app_templates_module: 'app-templates'

};
