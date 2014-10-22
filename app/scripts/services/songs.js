'use strict';

angular.module('jonsmusicApp')
  .service('songsService', ['$http', function ($http) {
    return {
      create : function(songData) {
        return $http.post('/api/admin/songs', songData);
      },
      index : function(query) {
        return $http({ url: '/api/admin/songs', method: 'GET', params: query });
      },
      show : function(id) {
        return $http.get('/api/admin/songs/' + id);
      },
      update : function(id, songData) {
        return $http.put('/api/admin/songs/' + id, songData);
      },
      delete : function(id) {
        return $http.delete('/api/admin/songs/' + id);
      }
    };
  }]);
