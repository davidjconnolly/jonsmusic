'use strict';

describe('albumsController Test', function() {
  var httpBackend;
  var controller;
  var scope;
  var routeParams;
  var albumFixtures;
  var songFixtures;

  beforeEach(module('jonsmusicApp', 'fixtures'));

  beforeEach(inject(function($httpBackend, $controller, $rootScope, $routeParams, mockAlbumService, _albumFixtures_, _songFixtures_) {
    mockAlbumService($httpBackend);
    httpBackend = $httpBackend;
    controller = $controller;
    routeParams = $routeParams;
    scope = $rootScope.$new();

    albumFixtures = _albumFixtures_;
    songFixtures = _songFixtures_;
  }));

  describe('Controller: albumsListController', function () {
    beforeEach(function() {
      controller('albumsListController', { $scope: scope });
      httpBackend.flush();
    });
    
    it('should return albums index', function() {
      assert.deepEqual(scope.albums, albumFixtures);
    });

    it('should crete a album', function() {
      var album = {
        "id": 3,
        "title": "Foo Create Album",
        "date": "1995-02-24T13:44:29.853Z",
        "description": ""
      };
      scope.formData = album;
      httpBackend.expectPOST('/api/albums').respond(200, album);
      httpBackend.expectGET('/api/albums').respond(albumFixtures.concat(album));

      scope.createAlbum();

      httpBackend.flush();
      assert.deepEqual(scope.formData, {});
      assert.deepEqual(scope.albums, albumFixtures.concat(album));
    });

    it('should delete a album', function() {
      httpBackend.expectGET('/api/albums').respond(albumFixtures[1]);

      scope.deleteAlbum(1);

      httpBackend.flush();
      assert.deepEqual(scope.formData, {});
      assert.deepEqual(scope.albums, albumFixtures[1]);
    });
  });

  describe('Controller: albumsDetailController', function () {
    beforeEach(function() {
      routeParams = { albumId: 1 };
      httpBackend.expectGET('/api/songs').respond();

      controller('albumsDetailController', { $scope: scope, $routeParams: routeParams });
      httpBackend.flush();
    });
    
    it('should return album', function() {
      assert.deepEqual(scope.album, albumFixtures[0]);
    });

    it('should update a album', function() {
      var updated_album = {
        "_id": 1,
        "title": "Foo Updated Album",
        "date": "2005-03-12T01:32:32.853Z",
        "description": "Now has Lyrics"
      };
      scope.formData = updated_album;
      httpBackend.expectPUT('/api/albums/1').respond(updated_album);
      httpBackend.expectGET('/api/songs').respond();

      scope.updateAlbum();

      httpBackend.flush();
      assert.deepEqual(scope.album, updated_album);
    });

    it('should search for a song', function() {
      scope.album.songs = [ songFixtures[0] ];
      httpBackend.expectGET('/api/songs?title=test').respond(songFixtures);

      scope.refreshSongs('test');
      httpBackend.flush();

      assert.deepEqual(scope.query_songs, [ songFixtures[1] ]);
    });

    it('should select a song', function() {
      var updated_album = {
        "_id": 1,
        "title": "Foo Updated Album",
        "date": "2005-03-12T01:32:32.853Z",
        "description": "Foo Lyrics",
        "songs": [ songFixtures[0] ]
      };
      httpBackend.expectPUT('/api/albums/1').respond(updated_album);
      httpBackend.expectGET('/api/songs').respond();

      scope.select.selected = songFixtures[0]

      httpBackend.flush();
      assert.deepEqual(scope.album.songs, [ songFixtures[0] ]);
    });

    it('should remove a song', function() {
      var updated_album = {
        "_id": 1,
        "title": "Foo Album",
        "date": "2014-08-30T01:44:29.849Z",
        "description": "Lorem ipsum dolor sit amet, eu usu prompta ponderum dissentiet.",
        "songs": songFixtures[1]
      };
      scope.album.songs = songFixtures;
      httpBackend.expectPUT('/api/albums/1', {
        "songs":[songFixtures[1]]

      }).respond(updated_album);
      httpBackend.expectGET('/api/songs').respond();

      scope.removeSong(songFixtures[0]);

      httpBackend.flush();
      assert.deepEqual(scope.album.songs, updated_album.songs);
    });

  });

});
