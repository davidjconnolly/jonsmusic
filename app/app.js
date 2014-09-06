'use strict';

var jonsmusicApp = {};

jonsmusicApp = angular.module('jonsmusicApp', [
  'ui.router',
  'ngRoute',
  'ui.bootstrap',
  'angularMoment'
])
.config(function ($routeProvider, $locationProvider, $httpProvider) {
  $routeProvider
      .when('/songs', {
        controller: 'songsListController',
        templateUrl: '/views/songs/index.html'
      })
      .when('/songs/:songId', {
        controller: 'songsDetailController',
        templateUrl: '/views/songs/edit.html'
      })
      .when('/albums', {
        controller: 'albumsListController',
        templateUrl: '/views/albums/index.html'
      })
      .when('/albums/:albumId', {
        controller: 'albumsDetailController',
        templateUrl: '/views/albums/edit.html'
      })
      .otherwise({
        redirectTo: '/index',
        templateUrl: '/views/main/index.html'
      });

    $locationProvider.html5Mode(true);
  });
