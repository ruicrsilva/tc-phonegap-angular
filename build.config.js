module.exports = {

  build_dir: 'build',

  app_files: {
    js: [
      'src/app/**/*.js',
      'src/common/**/*.js',
      '!src/**/*.spec.js',
      '!src/app/app-templates.js'
    ],
    jsUnit: [
      'src/**/*.spec.js'
    ],
    tpl: [
      'src/app/**/*.tpl.html',
      'src/common/**/*.tpl.html'
    ],
    html: [
      'src/index.html'
    ]
  },

  vendor_files: {
    js: [
      'src/vendor/polyfills/Array.js',
      'src/vendor/angular/angular.js',
      'src/vendor/angular-ui-router/angular-ui-router.js',
      'src/vendor/angular-ui-utils/route/route.js'
    ]
  }

};
