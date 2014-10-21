'use strict';

describe('songsController Test', function() {
  var httpBackend;
  var controller;
  var scope;
  var routeParams;
  var songFixtures;

  beforeEach(module('jonsmusicApp', 'fixtures'));

  beforeEach(inject(function($httpBackend, $controller, $rootScope, $routeParams, mockSongService, _songFixtures_) {
    mockSongService($httpBackend);
    httpBackend = $httpBackend;
    controller = $controller;
    routeParams = $routeParams;
    scope = $rootScope.$new();

    songFixtures = _songFixtures_;
  }));

  describe('Controller: songsListController', function () {
    beforeEach(function() {
      controller('songsListController', { $scope: scope });
      httpBackend.flush();
    });
    
    it('should return songs index', function() {
      assert.deepEqual(scope.songs, songFixtures);
    });

    it('should crete a song', function() {
      var song = {
        "id": 3,
        "title": "Foo Create Song",
        "date": "1995-02-24T13:44:29.853Z",
        "lyrics": ""
      };
      scope.formData = song;
      httpBackend.expectPOST('/api/songs').respond(200, song);
      httpBackend.expectGET('/api/songs').respond(songFixtures.concat(song));

      scope.createSong();

      httpBackend.flush();
      assert.deepEqual(scope.formData, {});
      assert.deepEqual(scope.songs, songFixtures.concat(song));
    });

    it('should delete a song', function() {
      httpBackend.expectGET('/api/songs').respond(songFixtures[1]);

      scope.deleteSong(1);

      httpBackend.flush();
      assert.deepEqual(scope.formData, {});
      assert.deepEqual(scope.songs, songFixtures[1]);
    });
  });

  describe('Controller: songsDetailController', function () {
    beforeEach(function() {
      routeParams = { songId: 1 };
      controller('songsDetailController', { $scope: scope, $routeParams: routeParams });
      httpBackend.flush();
    });
    
    it('should return song', function() {
      assert.deepEqual(scope.song, songFixtures[0]);
    });

    it('should update a song', function() {
      var updated_song = {
        "_id": 1,
        "title": "Foo Updated Song",
        "date": "2005-03-12T01:32:32.853Z",
        "lyrics": "Now has Lyrics"
      };
      scope.formData = updated_song;
      httpBackend.expectPUT('/api/songs/1').respond(updated_song);

      scope.updateSong();

      httpBackend.flush();
      assert.deepEqual(scope.song, updated_song);
    });

    it('should fail to update an invalid song', function() {
      var updated_song = {
        "_id": 1,
        "title": "",
        "date": "2005-03-12T01:32:32.853Z",
        "lyrics": "Now has Lyrics"
      };
      scope.formData = updated_song;
      httpBackend.expectPUT('/api/songs/1').respond(500, {"errors":{"title":{"message":"Path `title` is required."}}});

      scope.updateSong();

      httpBackend.flush();
      assert.deepEqual(scope.song, songFixtures[0]);
      assert.equal(scope.flash.error, "Path `title` is required.");
    });

  });

});
