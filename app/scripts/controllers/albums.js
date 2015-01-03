'use strict';

angular.module('jonsmusicApp')
  .controller('albumsAdminListController', ['$scope', 'albumsService',
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
  }])
  .controller('albumsAdminDetailController', ['$scope', '$routeParams', '$location', '$filter', 'albumsService', 'songsService', 'flash',
    function($scope, $routeParams, $location, $filter, albumsService, songsService, flash)
      {
        $scope.formData = {};
        $scope.loading = true;
        $scope.flash = flash;
        $scope.album = {};
        $scope.select = {};
        $scope.query_songs = [];

        // Load Album and setup input form
        albumsService.show($routeParams.albumId)
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

          updateAlbum(albumsService, $scope, $scope.album._id, $scope.formData);
        };

        // Listeners for Song selector
        $scope.refreshSongs = function(title) {
          songsService.index( { title: title } )
            .success(function(songs) {
              $scope.query_songs =  _.filter(songs, function(song) {
                return !_.contains(_.pluck($scope.album.songs, '_id'), song._id);
              });
            });
        };
        $scope.$watch('select.selected', function(song) {
          if (song) {
            var songs = $scope.album.songs.concat(song);

            updateAlbum(albumsService, $scope, $scope.album._id, {songs: songs});
          }
          $scope.select.selected = undefined;
        });

        // Listeners for Song list
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
  }])
  .controller('albumsPublicListController', ['$scope', 'albumsService',
    function($scope, albumsService)
      {
        $scope.loading = true;

        albumsService.publicIndex()
          .success(function(data) {
            $scope.albums = data;
            $scope.loading = false;
          });
  }])
  .controller('albumsPublicDetailController', ['$scope', '$sce', '$routeParams', 'albumsService',
    function($scope, $sce, $routeParams, albumsService)
      {
        $scope.loading = true;
        $scope.audioPlayer = {};
        $scope.playlist = {};

        $scope.trustSrc = function(src) {
          return $sce.trustAsResourceUrl(src);
        };

        $scope.parseInt = function(num) {
          return parseInt(num) || 0;
        };

        $scope.playAll = function () {
          $scope.audioPlayer.$selective = false;
          $scope.audioPlayer.play(0, false);
        };

        $scope.playSelected = function (index) {
          $scope.audioPlayer.play(index, true);
        };

        $scope.pauseSong = function () {
          $scope.audioPlayer.pause();
        };

        $scope.playSong = function () {
          $scope.audioPlayer.play();
        };

        $scope.getProgress = function () {
          var duration = parseInt((parseInt($scope.audioPlayer.currentTime)/parseInt($scope.audioPlayer.duration))*100) || 0;
          if (duration <= 9){
            return "0" + duration.toString();
          } else {
            return duration.toString();
          }
        };

        albumsService.publicShow($routeParams.albumId)
          .success(function(data) {
            $scope.playlist = _.map(data.songs, function(song){ return { src: song.file.fileUrl, type: song.file.fileType, name: song.title }; });
            $scope.album = data;
            $scope.loading = false;
          });
  }]);

function updateAlbum(albumsService, scope, id, data) {
  albumsService.update(id, data)
    .success(function(data) {
      scope.album = data;
      scope.refreshSongs();
      scope.select.selected = undefined;
      scope.loading = false;
      scope.flash.success = "Album updated successfully";
    })
    .error(function (error) {
      scope.flash.error = _.map(error.errors, function(error){ return error.message; }).join(', ');
    });
}