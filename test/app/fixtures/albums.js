'use strict';

var fixtures = angular.module('fixtures');
var albumFixtures = [
  {
    "_id": 1,
    "title": "Foo Album",
    "date": "2014-08-30T01:44:29.849Z",
    "description": "Lorem ipsum dolor sit amet, eu usu prompta ponderum dissentiet.",
    "songs": [],
    "published": false
  },
  {
    "_id": 2,
    "title": "Foo Other Album",
    "date": "2004-02-24T13:44:29.853Z",
    "description": "<p><u>Lorem ipsum dolor</u> sit amet, <b>eu usu prompta ponderum dissentiet</b>, est agam putant eripuit ne, id aliquip discere delicatissimi cum.</p>",
    "songs": [],
    "published": false
  }
];

fixtures.value('albumFixtures', albumFixtures);

fixtures.factory('mockAlbumService', function() {
  return function(httpBackend){
    httpBackend.whenGET('/api/albums').respond(albumFixtures);
    httpBackend.whenGET('/api/albums/1').respond(albumFixtures[0]);
    httpBackend.whenDELETE('/api/albums/1').respond(200, '');
    return null;
  };
});
