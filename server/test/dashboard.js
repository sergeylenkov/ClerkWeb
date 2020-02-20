const assert = require('assert');
const request = require('supertest');
const app = require('../index');

describe('GET /dashboard/balance', () => {
  it('should get dashboard balance', (done) => {
    request(app).get('/dashboard/balance')
      .expect(200)
      .end((err, res) => {
        assert(res.body.items.length > 0, 'must be more then 0');
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
        assert(res.body.items.length > 0, 'must be more then 0');
        done();
      });
  });
});

describe('GET /dashboard/receipts', () => {
  const from = new Date('2018-01-01T00:00:00');
  const to = new Date('2019-12-12T00:00:00');

  it(`should get dashboard receipts from ${from.toDateString()} to ${to.toDateString()}`, (done) => {
    request(app).get(`/dashboard/receipts?from=${from.toISOString()}&to=${to.toISOString()}`)
      .expect(200)
      .end((err, res) => {
        assert(res.body.items.length > 0, 'must be more then 0');
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
        assert(res.body.items.length > 0, 'must be more then 0');
        done();
      });
  });
});

describe('GET /dashboard/goals', () => {
  it('should get dashboard goals', (done) => {
    request(app).get('/dashboard/goals')
      .expect(200)
      .end((err, res) => {
        assert(res.body.items.length > 0, 'must be more then 0');
        done();
      });
  });
});

describe('GET /dashboard/debts', () => {
  it('should get dashboard debts', (done) => {
    request(app).get('/dashboard/debts')
      .expect(200)
      .end((err, res) => {
        assert(res.body.items.length > 0, 'must be more then 0');
        done();
      });
  });
});

describe('GET /dashboard/schedulers', () => {
  const from = new Date('2019-01-01T00:00:00');
  const to = new Date('2019-12-31T00:00:00');

  it(`should get dashboard schedulers from ${from.toDateString()} to ${to.toDateString()}`, (done) => {
    request(app).get(`/dashboard/schedulers?from=${from.toISOString()}&to=${to.toISOString()}`)
      .expect(200)
      .end((err, res) => {
        assert(res.body.items.length > 0, 'must be more then 0');
        done();
      });
  });
});