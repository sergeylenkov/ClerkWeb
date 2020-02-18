const assert = require('assert');
const request = require('supertest');
const app = require('../index');

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

describe('POST /transactions', () => {
	const transaction = {
		id: -1,
		fromAccount: 1,
		toAccount: 2,
		fromAmount: 100,
		toAmount: 100,
		tags: ['1', '2'],
		date: new Date('2019-01-01')
	}

	it('should add new transaction', (done) => {
		request(app).post('/transactions')
		.send(transaction)
		.expect(200)
		.end((err, res) => {
		  assert( res.body.id > 0, 'must be more then 0');
		  done();
		});
	});
});