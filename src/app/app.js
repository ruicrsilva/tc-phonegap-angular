angular.module( 'app', [
  'app-templates',
  'app.home',
  'app.about',
  'ui.router',
  'ui.route'
] )
.config( function ( $locationProvider, $stateProvider, $urlRouterProvider ) {
  $locationProvider.html5Mode( true ).hashPrefix( '!' );
  $urlRouterProvider.otherwise( '/' );
} )
.run( function ( titleService ) {
  titleService.setSuffix( ' | tc-angular' );
} )
.controller( 'AppCtrl', function AppCtrl( $scope, $location ) {
  $scope.title = 'tc-phonegap-angular';
} );