const assert = require('assert');
const request = require('supertest');
const app = require('../index');

describe('GET /reports/expenses/by_month', () => {
	const from = new Date('2018-01-01T00:00:00');
	const to = new Date('2019-12-12T00:00:00');

	it('should get expenses for report', (done) => {
	 	request(app).get(`/reports/expenses/by_month?from=${from.toISOString()}&to=${to.toISOString()}`)
		.expect(200)
		.end((err, res) => {
		  assert( res.body.items.length > 0, 'must be more then 0');
		  done();
		});
	});
});

describe('GET /reports/expenses/by_account', () => {
	const from = new Date('2018-01-01T00:00:00');
	const to = new Date('2019-12-12T00:00:00');

	it('should get expenses by account for report', (done) => {
	 	request(app).get(`/reports/expenses/by_account?from=${from.toISOString()}&to=${to.toISOString()}`)
		.expect(200)
		.end((err, res) => {
		  assert( res.body.items.length > 0, 'must be more then 0');
		  done();
		});
	});
});