angular.module( 'app.about', [
  'ui.router',
  'titleService'
])
.config( function config( $stateProvider ) {
  $stateProvider.state( 'about', {
    url: '/about',
    views: {
      "main": {
        controller: 'AboutCtrl',
        templateUrl: 'app/about/about.tpl.html'
      }
    }
  });
})
.controller( 'AboutCtrl', function( $scope, titleService ) {
  titleService.setTitle( 'About' );
});