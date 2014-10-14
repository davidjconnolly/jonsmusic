'use strict';

angular.module('jonsmusicApp')
  .controller('albumsListController', ['$scope', 'albumsService',
    function($scope, albumsService)
      {
        $scope.formData = {};
        $scope.loading = true;

        albumsService.index()
          .success(function(data) {
            $scope.albums = data;
            $scope.loading = false;
          });

        $scope.createAlbum = function() {
          if ($scope.formData.title && $scope.formData.title.trim() !== '') {
            $scope.loading = true;

            albumsService.create($scope.formData)
              .success(function() {
                albumsService.index()
                  .success(function(data) {
                    $scope.formData = {};
                    $scope.albums = data;
                    $scope.loading = false;
                  });
              });
          }
        };

        $scope.deleteAlbum = function(id) {
          $scope.loading = true;

          albumsService.delete(id)
            .success(function() {
              albumsService.index()
                .success(function(data) {
                  $scope.formData = {};
                  $scope.albums = data;
                  $scope.loading = false;
                });
            });
        };
      }]);

function updateAlbum(albumsService, scope, id, data) {
  albumsService.update(id, data)
    .success(function(data) {
      scope.album = data;
      scope.flash.success = "Album updated successfully";
    })
    .error(function (error) {
      scope.flash.error = _.map(error.errors, function(error){ return error.message; }).join(', ');
    });
}

angular.module('jonsmusicApp')
  .controller('albumsDetailController', ['$scope', '$routeParams', '$location', '$filter', 'albumsService', 'songsService', 'flash',
    function($scope, $routeParams, $location, $filter, albumsService, songsService, flash)
      {
        $scope.formData = {};
        $scope.loading = true;
        $scope.flash = flash;
        $scope.album = {};
        $scope.song = {};
        $scope.query_songs = [];

        // Load Album and setup input form
        albumsService.show($routeParams.albumId)
          .success(function(data) {
            $scope.album = data;

            $scope.formData.title = $scope.album.title;
            $scope.formData.description = $scope.album.description;

            if ($scope.album.date) {
              $scope.formData.date = moment.utc($scope.album.date).format("YYYY/MM/DD");
            }

            $scope.loading = false;
          });

        // Listeners for Song selector
        $scope.refreshSongs = function(value) {
          songsService.index( { title: value } )
            .success(function(data) {
              $scope.query_songs = data;
            });
        };
        $scope.$watch('song.selected', function(value) {
          if (value) {
            var songs = $scope.album.songs.concat(value);

            updateAlbum(albumsService, $scope, $scope.album._id, {songs: songs});
          }
          $scope.song.selected = undefined;
        });

        $scope.removeSong = function(song) {
          var songs = _.filter($scope.album.songs, function(item) {
            return item._id !== song._id;
          });

          updateAlbum(albumsService, $scope, $scope.album._id, {songs: songs});
        };

        $scope.dragControlListeners = {
          orderChanged: function(event) {
            updateAlbum(albumsService, $scope, $scope.album._id, {songs: $scope.album.songs});
          }
        };

        $scope.updateAlbum = function() {
          if ($scope.formData.date) {
            $scope.formData.date = moment.utc($scope.formData.date).format("YYYY/MM/DD");
          }

          updateAlbum(albumsService, $scope, $scope.album._id, $scope.formData);
        };
      }]);
