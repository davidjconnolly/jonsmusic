'use strict';

angular.module('jonsmusicApp')
  .factory('sessionService', function ($resource) {
    return $resource('/auth/session/');
  });
