'use strict';

process.env.NODE_ENV = 'test';

var chai = require("chai");
var app = require('../api/server');
var request = require('supertest');
var mongoose = require('mongoose');
var clearDB  = require('mocha-mongoose')(process.env.DATABASE_URI);

global.expect = chai.expect;
global.assert = chai.assert;
global.request = request;
global.app = app;
global.clearDB = clearDB;
