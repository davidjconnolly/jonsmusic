'use strict';

/*global app: true*/
/*global request: true*/
/*global session_user: true*/

process.env.NODE_ENV = 'test';

var chai = require("chai");
var app = require('../api/server');
var request = require('supertest');
var agent = request.agent(app);
var mongoose = require('mongoose');
var clearDB  = require('mocha-mongoose')(process.env.DATABASE_URI);
var User = require('../api/models/user');
var session_user;

global.expect = chai.expect;
global.assert = chai.assert;
global.agent = agent;
global.app = app;

global.session_user = session_user;
global.resetDB = function(done) {
  clearDB(function (){
    global.session_user = new User({
      email: 'test@test.com',
      username: 'Foo User',
      password: 'password'
    });
    global.session_user.save(done);
  });
};
