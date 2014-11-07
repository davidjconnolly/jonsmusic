'use strict';

angular.module('jonsmusicApp')
  .controller('songsAdminListController', ['$scope', '$filter', 'songsService',
    function($scope, $filter, songsService)
      {
        $scope.formData = {};
        $scope.loading = true;

        songsService.index()
          .success(function(data) {
            $scope.songs = data;
            $scope.loading = false;
          });

        $scope.createSong = function() {
          if ($scope.formData.title && $scope.formData.title.trim() !== '') {
            $scope.loading = true;

            songsService.create($scope.formData)
              .success(function() {
                songsService.index()
                  .success(function(data) {
                    $scope.formData = {};
                    $scope.songs = data;
                    $scope.loading = false;
                  });
              });
          }
        };

        $scope.deleteSong = function(id) {
          $scope.loading = true;

          songsService.delete(id)
            .success(function() {
              songsService.index()
                .success(function(data) {
                  $scope.formData = {};
                  $scope.songs = data;
                  $scope.loading = false;
                });
            });
        };
      }])
  .controller('songsAdminDetailController', ['$scope', '$routeParams', '$location', '$filter', '$http', '$upload', '$timeout', 'songsService', 'flash', 'x2js',
    function($scope, $routeParams, $location, $filter, $http, $upload, $timeout, songsService, flash, x2js)
      {
        $scope.formData = {};
        $scope.loading = true;
        $scope.flash = flash;
        $scope.x2js = x2js;
        $scope.progress = parseInt(0);
        $scope.upload = null;

        songsService.show($routeParams.songId)
          .success(function(data) {
            $scope.song = data;

            $scope.formData.title = $scope.song.title;
            $scope.formData.lyrics = $scope.song.lyrics;

            if ($scope.song.date) {
              $scope.formData.date = moment.utc($scope.song.date).format("YYYY/MM/DD");
            }

            $scope.loading = false;
          });

        $scope.updateSong = function() {
          if ($scope.formData.title !== undefined) {
            $scope.loading = true;

            if ($scope.formData.date) {
              $scope.formData.date = moment.utc($scope.formData.date).format("YYYY/MM/DD");
            }

            songsService.update($scope.song._id, $scope.formData)
              .success(function(data) {
                $scope.loading = false;
                $scope.formData = {};
                $scope.song = data;
                $scope.flash.success = "Song updated successfully";
              })
              .error(function (error) {
                $scope.loading = false;
                $scope.flash.error = _.map(error.errors, function(error){ return error.message; }).join(', ');
              });
          }
        };

        $scope.onFileSelect = function (files) {
          var file = files[0];

          $http.get('/api/admin/s3Policy?mimeType='+ file.type).success(function(response) {
            var s3Params = response;
            $scope.upload = $upload.upload({
              url: 'https://jonsmusic.s3.amazonaws.com/',
              method: 'POST',
              data: {
                'key' : Math.round(Math.random()*10000) + '$$' + file.name,
                'acl' : 'public-read',
                'Content-Type' : file.type,
                'AWSAccessKeyId': s3Params.AWSAccessKeyId,
                'success_action_status' : '201',
                'Policy' : s3Params.s3Policy,
                'Signature' : s3Params.s3Signature
              },
              file: file,
            });
            $scope.upload
            .then(function(response, x2js) {
              $scope.progress = parseInt(99);
              $timeout(function() { hideProgress($scope); }, 1000);
              if (response.status === 201) {
                var awsUrl = $scope.x2js.xml_str2json(response.data).PostResponse.Location;

                songsService.update($scope.song._id, {file: {
                  fileUrl: awsUrl,
                  fileType: file.type,
                  fileName: file.name
                }})
                  .success(function(data) {
                    $scope.song = data;
                  })
                  .error(function (error) {
                    $scope.flash.error = _.map(error.errors, function(error){ return error.message; }).join(', ');
                  });
              } else {
                $scope.flash.error = 'Upload Failed';
              }
            }, null, function(evt) {
              $scope.progress =  parseInt(100.0 * evt.loaded / evt.total / 1.25);
            });
          });
        };

      }]);

function hideProgress(scope) {
  scope.progress = parseInt(100);
  scope.flash.success = "Song uploaded successfully";
}
