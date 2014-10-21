'use strict';

angular.module('jonsmusicApp')
  .controller('albumsListController', ['$scope', 'albumsAdminService',
    function($scope, albumsAdminService)
      {
        $scope.formData = {};
        $scope.loading = true;

        albumsAdminService.index()
          .success(function(data) {
            $scope.albums = data;
            $scope.loading = false;
          });

        $scope.createAlbum = function() {
          if ($scope.formData.title && $scope.formData.title.trim() !== '') {
            $scope.loading = true;

            albumsAdminService.create($scope.formData)
              .success(function() {
                albumsAdminService.index()
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

          albumsAdminService.delete(id)
            .success(function() {
              albumsAdminService.index()
                .success(function(data) {
                  $scope.formData = {};
                  $scope.albums = data;
                  $scope.loading = false;
                });
            });
        };
      }]);

function updateAlbum(albumsAdminService, scope, id, data) {
  albumsAdminService.update(id, data)
    .success(function(data) {
      scope.album = data;
      scope.refreshSongs();
      scope.select.selected = undefined;
      scope.flash.success = "Album updated successfully";
    })
    .error(function (error) {
      scope.flash.error = _.map(error.errors, function(error){ return error.message; }).join(', ');
    });
}

angular.module('jonsmusicApp')
  .controller('albumsDetailController', ['$scope', '$routeParams', '$location', '$filter', 'albumsAdminService', 'songsAdminService', 'flash',
    function($scope, $routeParams, $location, $filter, albumsAdminService, songsAdminService, flash)
      {
        $scope.formData = {};
        $scope.loading = true;
        $scope.flash = flash;
        $scope.album = {};
        $scope.select = {};
        $scope.query_songs = [];

        // Load Album and setup input form
        albumsAdminService.show($routeParams.albumId)
          .success(function(data) {
            $scope.album = data;

            $scope.formData.title = $scope.album.title;
            $scope.formData.description = $scope.album.description;
            $scope.formData.published = $scope.album.published;


            if ($scope.album.date) {
              $scope.formData.date = moment.utc($scope.album.date).format("YYYY/MM/DD");
            }

            $scope.refreshSongs();

            $scope.loading = false;
          });
        $scope.updateAlbum = function() {
          if ($scope.formData.date) {
            $scope.formData.date = moment.utc($scope.formData.date).format("YYYY/MM/DD");
          }

          updateAlbum(albumsAdminService, $scope, $scope.album._id, $scope.formData);
        };

        // Listeners for Song selector
        $scope.refreshSongs = function(title) {
          songsAdminService.index( { title: title } )
            .success(function(songs) {
              $scope.query_songs =  _.filter(songs, function(song) {
                return !_.contains(_.pluck($scope.album.songs, '_id'), song._id);
              });
            });
        };
        $scope.$watch('select.selected', function(song) {
          if (song) {
            var songs = $scope.album.songs.concat(song);

            updateAlbum(albumsAdminService, $scope, $scope.album._id, {songs: songs});
          }
          $scope.select.selected = undefined;
        });

        // Listeners for Song list
        $scope.removeSong = function(song) {
          var songs = _.filter($scope.album.songs, function(item) {
            return item._id !== song._id;
          });

          updateAlbum(albumsAdminService, $scope, $scope.album._id, {songs: songs});
        };
        $scope.dragControlListeners = {
          orderChanged: function(event) {
            updateAlbum(albumsAdminService, $scope, $scope.album._id, {songs: $scope.album.songs});
          }
        };
      }]);
