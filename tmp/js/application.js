'use strict';

var jonsmusicApp = {};

jonsmusicApp = angular.module('jonsmusicApp', [
  'ui.router',
  'ngRoute',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'http-auth-interceptor',
  'ui.bootstrap',
  'angularMoment'
])
.config(function ($routeProvider, $locationProvider, $httpProvider) {
  $routeProvider
      .when('/songs', {
        controller: 'songsListController',
        templateUrl: '/views/songs/index.html'
      })
      .when('/songs/:songId', {
        controller: 'songsDetailController',
        templateUrl: '/views/songs/edit.html'
      })
      .when('/albums', {
        controller: 'albumsListController',
        templateUrl: '/views/albums/index.html'
      })
      .when('/albums/:albumId', {
        controller: 'albumsDetailController',
        templateUrl: '/views/albums/edit.html'
      })
      .when('/login', {
        templateUrl: 'views/auth/login.html',
        controller: 'loginController'
      })
      .when('/signup', {
        templateUrl: '/views/auth/signup.html',
        controller: 'signupController'
      })
      .otherwise({
        redirectTo: '/index',
        templateUrl: '/views/main/index.html'
      });

    $locationProvider.html5Mode(true);
  })
.run(function ($rootScope, $location, authService) {
    //watching the value of the currentUser variable.
    $rootScope.$watch('currentUser', function(currentUser) {
      // if no currentUser and on a page that requires authorization then try to update it
      // will trigger 401s if user does not have a valid session
      if (!currentUser && (['/', '/login', '/logout', '/signup'].indexOf($location.path()) == -1 )) {
        authService.currentUser();
      }
    });

    // On catching 401 errors, redirect to the login page.
    $rootScope.$on('event:auth-loginRequired', function() {
      $location.path('/login');
      return false;
    });
  });

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

'use strict';

angular.module('jonsmusicApp')
  .factory('authService', function authService($location, $rootScope, sessionService, userService, $cookieStore) {
    $rootScope.currentUser = $cookieStore.get('user') || null;
    $cookieStore.remove('user');

    return {

      login: function(provider, user, callback) {
        var cb = callback || angular.noop;
        sessionService.save({
          provider: provider,
          email: user.email,
          password: user.password,
          rememberMe: user.rememberMe
        }, function(user) {
          $rootScope.currentUser = user;
          return cb();
        }, function(err) {
          return cb(err.data);
        });
      },

      logout: function(callback) {
        var cb = callback || angular.noop;
        sessionService.delete(function(res) {
            $rootScope.currentUser = null;
            return cb();
          },
          function(err) {
            return cb(err.data);
          });
      },

      createUser: function(userinfo, callback) {
        var cb = callback || angular.noop;
        userService.save(userinfo,
          function(user) {
            $rootScope.currentUser = user;
            return cb();
          },
          function(err) {
            return cb(err.data);
          });
      },

      currentUser: function() {
        sessionService.get(function(user) {
          $rootScope.currentUser = user;
        });
      },

      changePassword: function(email, oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;
        userService.update({
          email: email,
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function(user) {
            console.log('password changed');
            return cb();
        }, function(err) {
            return cb(err.data);
        });
      },

      removeUser: function(email, password, callback) {
        var cb = callback || angular.noop;
        userService.delete({
          email: email,
          password: password
        }, function(user) {
            console.log(user + 'removed');
            return cb();
        }, function(err) {
            return cb(err.data);
        });
      }
    };
  });

'use strict';

angular.module('jonsmusicApp')
  .factory('sessionService', function ($resource) {
    return $resource('/auth/session/');
  });

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

'use strict';

angular.module('jonsmusicApp')
  .directive('jaDatePicker', function () {
  return {
      scope: {
        bind: '='
      },
      templateUrl: '/views/templates/ja_datepicker.html',
      transclude: true,
      controller: function ($scope) {
        $scope.open = function($event) {
          $event.preventDefault();
          $event.stopPropagation();
          $scope.opened = true;
        };
      }
    };
});

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
              $scope.formData.date = moment.utc($scope.album.date).format("YYYY/MM/DD");
            }

            $scope.loading = false;
          });

        $scope.updateAlbum = function() {
          if ($scope.formData.title !== undefined) {
            $scope.loading = true;

            if ($scope.formData.date) {
              $scope.formData.date = moment.utc($scope.formData.date).format("YYYY/MM/DD");
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

'use strict';

angular.module('jonsmusicApp')
  .controller('loginController', function ($scope, authService, $location) {
    $scope.error = {};
    $scope.user = {};

    $scope.login = function(form) {
      authService.login('password', {
          'email': $scope.user.email,
          'password': $scope.user.password
        },
        function(err) {
          $scope.errors = {};

          if (!err) {
            $location.path('/');
          } else {
            angular.forEach(err.errors, function(error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.type;
            });
            $scope.error.other = err.message;
          }
      });
    };
  });

'use strict';

angular.module('jonsmusicApp')
  .controller('navbarController', function ($scope, authService, $location) {
    $scope.menu = [];

    $scope.authMenu = [
      {
        "title": "Songs",
        "link": "songs"
      },
      {
        "title": "Albums",
        "link": "albums"
      }
    ];

    $scope.logout = function() {
      authService.logout(function(err) {
        if(!err) {
          $location.path('/login');
        }
      });
    };
  });

'use strict';

angular.module('jonsmusicApp')
  .controller('signupController', function ($scope, authService, $location) {
    $scope.register = function(form) {
      authService.createUser({
          email: $scope.user.email,
          username: $scope.user.username,
          password: $scope.user.password
        },
        function(err) {
          $scope.errors = {};

          if (!err) {
            $location.path('/');
          } else {
            angular.forEach(err.errors, function(error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.type;
            });
          }
        }
      );
    };
  });

'use strict';

angular.module('jonsmusicApp')
  .controller('songsListController', ['$scope', '$filter', 'songsService',
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
      }]);

angular.module('jonsmusicApp')
  .controller('songsDetailController', ['$scope', '$routeParams', '$location', '$filter', 'songsService',
    function($scope, $routeParams, $location, $filter, songsService)
      {
        $scope.formData = {};
        $scope.loading = true;

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
                $scope.songs = data;
                $location.path('/songs');
              });
          }
        };
      }]);
