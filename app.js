var app = angular.module('app', ['ngRoute', 'firebase']);

app.run(function ($rootScope, $location) {
  $rootScope.$on('$routeChangeError', function (e, next, prev, err) {
    if (err === 'AUTH_REQUIRED')
      $location.path('/login'); 
  });
});

app.config(function($routeProvider) {
  $routeProvider
    .when('/home', {
      template: '<home></home>',
      resolve: {
        currentAuth: function (auth) {
          return auth.$requireSignIn(); 
        }
      }
    })
    .when('/preferences', {
      template: '<preferences-edit user-preferences="$resolve.userPreferences"></preferences-edit>',
      resolve: {
        currentAuth: function (auth) {
          return auth.$requireSignIn(); 
        },
        userPreferences: function (fbRef, $firebaseObject, auth) {
          return auth.$requireSignIn().then(function () {
            return $firebaseObject(fbRef.getPreferencesRef()).$loaded();
          });
        }
      }
    })
    .when('/login', {
      template: '<login current-auth="$resolve.currentAuth"></login>',
      resolve: {
        currentAuth: function (auth) {
          return auth.$waitForSignIn();
        }
      }
    })
    .when('/logout', { template: '<logout></logout>' })
    .otherwise('/home');
});