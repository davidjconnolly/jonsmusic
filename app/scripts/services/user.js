'use strict';

angular.module('jonsmusicApp')
  .factory('userService', function ($resource) {
    return $resource('/auth/users/:id/', {},
      {
        'update': {
          method:'PUT'
        }
      });
  });
