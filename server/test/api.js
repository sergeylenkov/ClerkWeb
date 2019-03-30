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
	const from = new Date('2018-01-01T00:00:00');
	const to = new Date('2019-12-12T00:00:00');

    it('should get transactions', (done) => {
      	request(app).get(`/transactions?from=${from.toISOString()}&to=${to.toISOString()}`)
        .expect(200)
        .end((err, res) => {
        	assert( res.body.items.length > 0, 'must be more then 0');
          	done();
        });
    });
});

describe('GET /transactions/recent', () => {
	const limit = 10;

    it('should get recent transactions', (done) => {
      	request(app).get(`/transactions/recent?limit=${limit}`)
        .expect(200)
        .end((err, res) => {
        	assert( res.body.items.length == 10, 'must be 10');
          	done();
        });
    });
});

describe('GET /dashboard/balance', () => {
  	it('should get dashboard balance', (done) => {
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

  	it(`should get dashboard expenses from ${from.toDateString()} to ${to.toDateString()}`, (done) => {
    	request(app).get(`/dashboard/expenses?from=${from.toISOString()}&to=${to.toISOString()}`)
      	.expect(200)
      	.end(function(err, res) {        
        	assert( res.body.items.length > 0, 'must be more then 0');
        	done();
      	});
  	});
});

describe('GET /dashboard/budgets', () => {
	const from = new Date('2018-01-01T00:00:00');
	const to = new Date('2019-12-12T00:00:00');

  	it(`should get dashboard budgets from ${from.toDateString()} to ${to.toDateString()}`, (done) => {
    	request(app).get(`/dashboard/budgets?from=${from.toISOString()}&to=${to.toISOString()}`)
      	.expect(200)
      	.end(function(err, res) {        
        	assert( res.body.items.length > 0, 'must be more then 0');
        	done();
      	});
  	});
});

describe('GET /dashboard/goals', () => {
	it('should get dashboard goals', (done) => {
	  request(app).get('/dashboard/goals')
		.expect(200)
		.end(function(err, res) {        
		  assert( res.body.items.length > 0, 'must be more then 0');
		  done();
		});
	});
});

describe('GET /dashboard/credits', () => {
	it('should get dashboard credits', (done) => {
	  request(app).get('/dashboard/credits')
		.expect(200)
		.end(function(err, res) {        
		  assert( res.body.items.length > 0, 'must be more then 0');
		  done();
		});
	});
});

describe('GET /budgets', () => {
	it('should get all budgets', (done) => {
	  request(app).get('/budgets')
		.expect(200)
		.end(function(err, res) {        
		  assert( res.body.items.length > 0, 'must be more then 0');
		  done();
		});
	});
});