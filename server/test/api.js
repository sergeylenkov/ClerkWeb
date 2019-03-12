const assert = require('assert');
const request = require('supertest');
const app = require('../index');

describe('GET /accounts', () => {
    it('should get all accounts', (done) => {
    	request(app).get('/accounts')
        .expect(200)
        .end(function(err, res) {
        	assert( res.body.items.length > 0, 'must be more then 0');
          	done();
        });
    });
});

describe('GET /transactions', () => {
    it('should get all transactions', (done) => {
      	request(app).get('/transactions')
        .expect(200)
        .end(function(err, res) {
        	assert( res.body.items.length > 0, 'must be more then 0');
          	done();
        });
    });
});

describe('GET /dashboard/balance', () => {
  	it('should get balance', (done) => {
    	request(app).get('/dashboard/balance')
      	.expect(200)
      	.end(function(err, res) {        
        	assert( res.body.items.length > 0, 'must be more then 0');
        	done();
      	});
  	});
});

describe('GET /dashboard/expenses', () => {
	const from = new Date('2018-01-01T00:00:00');
	const to = new Date('2019-12-12T00:00:00');

  	it(`should get expenses from ${from.toDateString()} to ${to.toDateString()}`, (done) => {
    	request(app).get(`/dashboard/expenses?from=${from.toISOString()}&to=${to.toISOString()}`)
      	.expect(200)
      	.end(function(err, res) {        
        	assert( res.body.items.length > 0, 'must be more then 0');
        	done();
      	});
  	});
});