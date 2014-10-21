'use strict';

angular.module('jonsmusicApp')
  .service('albumsAdminService', ['$http', function ($http) {
    return {
      create : function(albumData) {
        return $http.post('/api/admin/albums', albumData);
      },
      index : function() {
        return $http.get('/api/admin/albums');
      },
      show : function(id) {
        return $http.get('/api/admin/albums/' + id);
      },
      update : function(id, albumData) {
        return $http.put('/api/admin/albums/' + id, albumData);
      },
      delete : function(id) {
        return $http.delete('/api/admin/albums/' + id);
      }
    };
  }]);
