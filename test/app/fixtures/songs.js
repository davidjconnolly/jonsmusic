'use strict';

var fixtures = angular.module('fixtures');
var songFixtures = [
  {
    "_id": 1,
    "title": "Foo Song",
    "date": "2014-08-30T01:44:29.849Z",
    "lyrics": "Lorem ipsum dolor sit amet, eu usu prompta ponderum dissentiet.",
    "albums": []
  },
  {
    "_id": 2,
    "title": "Foo Other Song",
    "date": "2004-02-24T13:44:29.853Z",
    "lyrics": "<p><u>Lorem ipsum dolor</u> sit amet, <b>eu usu prompta ponderum dissentiet</b>, est agam putant eripuit ne, id aliquip discere delicatissimi cum.</p>",
    "albums": []
  }
];

fixtures.value('songFixtures', songFixtures);

fixtures.factory('mockSongService', function() {
  return function(httpBackend){
    httpBackend.whenGET('/api/admin/songs').respond(songFixtures);
    httpBackend.whenGET('/api/admin/songs/1').respond(songFixtures[0]);
    httpBackend.whenDELETE('/api/admin/songs/1').respond(200, '');
    return null;
  };
});
