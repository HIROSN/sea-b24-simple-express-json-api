'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');

var server = 'http://localhost:' + (process.env.PORT || 3000);
var expect = chai.expect;
var assert = chai.assert;

require('../server.js');
chai.use(chaihttp);

describe('Simple JSON API', function() {
  it('should send the local time', function(done) {
    chai.request(server).
      get('/time').
      end(function(err, res) {
        assert.equal(err, null);
        expect(res).to.be.a('object');
        expect(res).to.have.status(200);

        expect(res.text).to.be.a('string');
        expect(res.text).to.have.length(8);
        expect(res.text).to.have.string(':');

        assert(res.text.split(':')[0] == (new Date()).getHours(),
          'unexpected hours');

        done();
      });
  });

  it('should greet someone', function(done) {
    chai.request(server).
      get('/greeting/me').
      end(function(err, res) {
        assert.equal(err, null);
        expect(res).to.be.a('object');
        expect(res).to.have.status(200);

        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('msg');

        expect(res.body.msg).to.be.a('string');
        expect(res.body.msg).equals('Hello me!');
        done();
      });
  });
});
