module.exports = {

  build_dir: 'build',

  app_files: {
    js: [
      'src/app/**/*.js',
      'src/common/**/*.js',
      '!src/**/*.spec.js'
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
      'vendor/polyfills/Array.js',
      'vendor/angular/angular.js',
      'vendor/angular-ui-router/angular-ui-router.js',
      'vendor/angular-ui-utils/route/route.js'
    ]
  }

};
