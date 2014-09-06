'use strict';

angular.module('jonsmusicApp')
  .service('songsService', ['$http', function ($http) {
    return {
      create : function(songData) {
        return $http.post('/api/songs', songData);
      },
      index : function() {
        return $http.get('/api/songs');
      },
      show : function(id) {
        return $http.get('/api/songs/' + id);
      },
      update : function(id, songData) {
        return $http.put('/api/songs/' + id, songData);
      },
      delete : function(id) {
        return $http.delete('/api/songs/' + id);
      }
    };
  }]);
