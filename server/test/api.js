const assert = require('assert');
const request = require('supertest');
const app = require('../index');

describe('GET /accounts', () => {
    it('should get all accounts', (done) => {
      request(app)
        .get('/accounts')
        .expect(200)
        .end(function(err, res) {
          assert( res.body.items.length > 0, 'must be more then 0');
          done();
        });
    });
});

describe('GET /transactions', () => {
    it('should get all transactions', (done) => {
      request(app)
        .get('/transactions')
        .expect(200)
        .end(function(err, res) {
          assert( res.body.items.length > 0, 'must be more then 0');
          done();
        });
    });
});

describe('GET /dashboard/balance', () => {
  it('should get balance', (done) => {
    request(app)
      .get('/dashboard/balance')
      .expect(200)
      .end(function(err, res) {        
        assert( res.body.items.length > 0, 'must be more then 0');
        done();
      });
  });
});