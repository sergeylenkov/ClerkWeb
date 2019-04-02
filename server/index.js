const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dashboard = require('./routes/dashboard');
const accounts = require('./routes/accounts');
const transactions = require('./routes/transactions');
const budgets = require('./routes/budgets');
const goals = require('./routes/goals');
const schedulers = require('./routes/schedulers');
const tags = require('./routes/tags');

const app = express();

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
//app.use(bodyParser);
app.use(bodyParser.json());

app.use('/dashboard', dashboard);
app.use('/accounts', accounts);
app.use('/transactions', transactions);
app.use('/budgets', budgets);
app.use('/goals', goals);
app.use('/schedulers', schedulers);
app.use('/tags', tags);

app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);

module.exports = app;