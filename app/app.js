'use strict';

var jonsmusicApp = {};

jonsmusicApp = angular.module('jonsmusicApp', [
  'ui.router',
  'ngRoute',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'http-auth-interceptor',
  'ui.bootstrap',
  'angularMoment',
  'angular-flash.service',
  'angular-flash.flash-alert-directive',
  'angular-underscore',
  'ui.select',
  'ui.sortable'
])
.config(function ($routeProvider, $locationProvider, $httpProvider, flashProvider, uiSelectConfig) {
  $routeProvider
      .when('/admin/songs', {
        controller: 'songsAdminListController',
        templateUrl: '/views/admin/songs/index.html'
      })
      .when('/admin/songs/:songId', {
        controller: 'songsAdminDetailController',
        templateUrl: '/views/admin/songs/edit.html'
      })
      .when('/admin/albums', {
        controller: 'albumsAdminListController',
        templateUrl: '/views/admin/albums/index.html'
      })
      .when('/admin/albums/:albumId', {
        controller: 'albumsAdminDetailController',
        templateUrl: '/views/admin/albums/edit.html'
      })
      .when('/login', {
        templateUrl: 'views/auth/login.html',
        controller: 'loginController'
      })
      .when('/signup', {
        templateUrl: '/views/auth/signup.html',
        controller: 'signupController'
      })
      .when('/albums/:albumId', {
        controller: 'albumsPublicDetailController',
        templateUrl: '/views/main/albums/show.html'
      })
      .otherwise({
        controller: 'albumsPublicListController',
        templateUrl: '/views/main/albums/index.html'
      });

    $locationProvider.html5Mode(true);

    flashProvider.errorClassnames.push('alert-danger');
    uiSelectConfig.theme = 'bootstrap';
  })
.run(function ($rootScope, $location, authService) {
    //watching the value of the currentUser variable.
    $rootScope.$watch('currentUser', function(currentUser) {
      // if no currentUser and on a page that requires authorization then try to update it
      // will trigger 401s if user does not have a valid session
      if (!currentUser && _.some(['/', '/login', '/logout', '/signup', '/albums'], function(item) {
          $location.path().search(item) != -1;
        })) {
          authService.currentUser();
        }
      });

    // On catching 401 errors, redirect to the login page.
    $rootScope.$on('event:auth-loginRequired', function() {
      $location.path('/login');
      return false;
    });
  });
