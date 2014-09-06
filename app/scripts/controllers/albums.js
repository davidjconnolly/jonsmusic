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

angular.module('jonsmusicApp')
  .controller('albumsDetailController', ['$scope', '$routeParams', '$location', '$filter', 'albumsService',
    function($scope, $routeParams, $location, $filter, albumsService)
      {
        $scope.formData = {};
        $scope.loading = true;

        albumsService.show($routeParams.albumId)
          .success(function(data) {
            $scope.album = data;

            $scope.formData.title = $scope.album.title;
            $scope.formData.description = $scope.album.description;

            if ($scope.album.date) {
              $scope.formData.date = moment.utc($scope.album.date).format("YYYY/MM/DD")
            }

            $scope.loading = false;
          });

        $scope.updateAlbum = function() {
          if ($scope.formData.title !== undefined) {
            $scope.loading = true;

            if ($scope.formData.date) {
              $scope.formData.date = moment.utc($scope.formData.date).format("YYYY/MM/DD")
            }

            albumsService.update($scope.album._id, $scope.formData)
              .success(function(data) {
                $scope.loading = false;
                $scope.formData = {};
                $scope.albums = data;
                $location.path('/albums');
              });
          }
        };
      }]);
