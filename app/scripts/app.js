'use strict';

angular.module('jonsmusicApp', [
  'ui.router',
  'ngRoute'
])

.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/songs', {
        controller: 'songsListController',
        templateUrl: 'public/views/songs/index.html'
      })
      .when('/songs/:songId', {
        controller: 'songsDetailController',
        templateUrl: 'public/views/songs/show.html'
      })
      .when('/albums', {
        controller: 'albumsListController',
        templateUrl: 'public/views/albums/index.html'
      })
      .when('/albums/:albumId', {
        controller: 'albumsDetailController',
        templateUrl: 'public/views/albums/show.html'
      })
      // .otherwise({
      //   redirectTo: '/albums'
      // });
  }]);