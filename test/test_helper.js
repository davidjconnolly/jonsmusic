'use strict';

process.env.NODE_ENV = 'test'

var chai = require("chai")
var app = require('../api/server')
var request = require('supertest')
var mongoose = require('mongoose');

global.expect = chai.expect
global.assert = chai.assert
global.request = request
global.app = app
