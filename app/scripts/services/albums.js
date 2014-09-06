'use strict';

angular.module('jonsmusicApp')
  .service('albumsService', ['$http', function ($http) {
    return {
      create : function(albumData) {
        return $http.post('/api/albums', albumData);
      },
      index : function() {
        return $http.get('/api/albums');
      },
      show : function(id) {
        return $http.get('/api/albums/' + id);
      },
      update : function(id, albumData) {
        return $http.put('/api/albums/' + id, albumData);
      },
      delete : function(id) {
        return $http.delete('/api/albums/' + id);
      }
    };
  }]);
