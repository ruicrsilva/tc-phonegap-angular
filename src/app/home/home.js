angular.module( 'app.home', [
  'ui.router',
  'titleService'
])
.config( function config( $stateProvider ) {
  $stateProvider.state( 'home', {
    url: '/home',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'app/home/home.tpl.html'
      }
    }
  });
})
.controller( 'HomeCtrl', function( $scope, titleService ) {
  titleService.setTitle( 'Home' );
});