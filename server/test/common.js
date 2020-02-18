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

describe('GET /budgets', () => {
	const from = new Date('2018-01-01T00:00:00');
	const to = new Date('2019-12-12T00:00:00');

	it('should get all budgets', (done) => {
	 	request(app).get(`/budgets?from=${from.toISOString()}&to=${to.toISOString()}`)
		.expect(200)
		.end((err, res) => {
		  assert( res.body.items.length > 0, 'must be more then 0');
		  done();
		});
	});
});

describe('GET /goals', () => {
	it('should get all goals', (done) => {
	  	request(app).get('/goals')
		.expect(200)
		.end((err, res) => {
		  assert( res.body.items.length > 0, 'must be more then 0');
		  done();
		});
	});
});

describe('GET /schedulers', () => {
	it('should get all schedulers', (done) => {
	  	request(app).get('/schedulers')
		.expect(200)
		.end((err, res) => {
		  assert( res.body.items.length > 0, 'must be more then 0');
		  done();
		});
	});
});

describe('GET /tags', () => {
	it('should get all tags', (done) => {
	  	request(app).get('/tags')
		.expect(200)
		.end((err, res) => {
		  assert( res.body.items.length > 0, 'must be more then 0');
		  done();
		});
	});
});


describe('GET /exchangeRates', () => {
	it('should get all exchange rates', (done) => {
	  	request(app).get('/exchangeRates')
		.expect(200)
		.end((err, res) => {
		  assert( res.body.items['USD_RUB'] > 0, 'must be more then 0');
		  done();
		});
	});
});