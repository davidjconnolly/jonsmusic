'use strict';

angular.module('jonsmusicApp')
  .service('songsService', ['$http', function ($http) {
    return {
      create : function(songData) {
        return $http.post('/api/songs', songData);
      },
      index : function(query) {
        return $http({ url: '/api/songs', method: 'GET', params: query });
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
