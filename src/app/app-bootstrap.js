var app = {
  initialize: function() {
    this.bindEvents();
  },
  bootstrapped: false,
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  onDeviceReady: function() {
    console.log("Received deviceready event");
    if ( false === app.bootstrapped ) {
      console.log("Bootstrapping Angular Application");
      angular.bootstrap(document, ['app']);
      app.bootstrapped = true;
    }
  }
};