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
      	.end((err, res) => {
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
      	.end((err, res) => {
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
      	.end((err, res) => {
        	assert( res.body.items.length > 0, 'must be more then 0');
        	done();
      	});
  	});
});

describe('GET /dashboard/goals', () => {
	it('should get dashboard goals', (done) => {
	  		request(app).get('/dashboard/goals')
			.expect(200)
			.end((err, res) => {
		 		assert( res.body.items.length > 0, 'must be more then 0');
		  		done();
			});
	});
});

describe('GET /dashboard/debts', () => {
	it('should get dashboard debts', (done) => {
		request(app).get('/dashboard/debts')
		.expect(200)
		.end((err, res) => {
			assert( res.body.items.length > 0, 'must be more then 0');
			done();
		});
	});
});

describe('GET /dashboard/schedulers', () => {
	const from = new Date('2019-01-01T00:00:00');
	const to = new Date('2019-02-31T00:00:00');

  	it(`should get dashboard schedulers from ${from.toDateString()} to ${to.toDateString()}`, (done) => {
    	request(app).get(`/dashboard/schedulers?from=${from.toISOString()}&to=${to.toISOString()}`)
      	.expect(200)
      	.end((err, res) => {
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

describe('GET /exchangeRates', () => {
	it('should get all exchange rates', (done) => {
	  	request(app).get('/exchangeRates')
		.expect(200)
		.end((err, res) => {
		  assert( res.body.items.length > 0, 'must be more then 0');
		  done();
		});
	});
});