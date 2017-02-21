import { ApiRequest } from './api.js';

export class DataHelper {
	constructor(url) {
		this.url = url;
		this.accountType = {receipt: 0, deposit: 1, expense: 2, credit: 3, debt: 4};
	}

	accounts(callback) {
		let api = new ApiRequest(this.url);
		api.get('accounts', null, callback);
    }

	availableAmounts(callback) {
		let api = new ApiRequest(this.url);
		api.get('available_amounts', null, callback);
	}

	budget(from, to, callback) {
		let api = new ApiRequest(this.url);
		let data = { from: from, to: to };
		api.get('budget', data, callback);
	}

	expenses(from, to, callback) {
		let api = new ApiRequest(this.url);
		let data = { from: from, to: to };
		api.get('expenses', data, callback);
	}
}

/*	this._url = url;


	this.accounts = function(type, active, callback) {
		let request = this.makeRequest('account', { type: type, active: active }, callback);

		if (request) {
			request.send();
		}
        $.ajax({
            url: this._url,
            dataType: "json",
            data: { action: "accounts", type: type, active: active ? 1 : 0 },
        }).done(function(response) {
			callback(response);
		});
    }





	this.expensesByDate = function(account, from, to, callback) {
	    $.ajax({
	        url: this._url,
	        dataType: "json",
	        data: { action: "expenses_by_date", account: account, from: from, to: to },
	    }).done(function (response) {
			callback(response);
		});
	}

	this.expensesByMonth = function(account, fromDate, toDate, callback) {
        $.ajax({
            url: this._url,
            dataType: "json",
            data: { action: "expenses_by_month" , account: account, from: fromDate, to: toDate },
        }).done(function (response) {
			callback(response);
		});
	}

	this.lastTransactions = function(limit, callback) {
        $.ajax({
            url: this._url,
            dataType: "json",
            data: { action: "last_transactions", from: 0, to: limit },
        }).done(function (response) {
            callback(response);
        });
	}

	this.transactions = function(account, fromDate, toDate, callback) {
		var data = { action: "transactions", id: account, from: fromDate, to: toDate };

		if (!account) {
			data = { action: "transactions", from: fromDate, to: toDate }
		}

        $.ajax({
            url: this._url,
            dataType: "json",
            data: data,
        }).done(function (response) {
            callback(response);
        });
	}

	this.saveTransaction = function(data, callback) {
		$.ajax({
			url: this._url,
			dataType: "json",
			data: data,
		}).done(function(response) {
			callback(response);
		});
	}

	this.deleteTransaction = function(transaction, callback) {
		$.ajax({
			url: this._url,
			dataType: "json",
			data: {action: "transaction", mode: "delete", id: transaction.id},
		}).done(function(response) {
			callback(response);
		});
	}

	this.splitTransaction = function(transaction, callback) {
		$.ajax({
			url: this._url,
			dataType: "json",
			data: {action: "transaction", mode: "split", id: transaction.id, from_amount: transaction.from_account_amount, to_amount: transaction.to_account_amount},
		}).done(function(response) {
			callback(response);
		});
	}

	this.accountBalance = function(account, callback) {
		$.ajax({
            url: this._url,
            dataType: "json",
            data: {action: "balance", id: account.id},
        }).done(function (response) {
			callback(response);
		});
	}

	this.transactionTags = function(transaction, callback) {
		$.ajax({
			url: this._url,
			dataType: "json",
			data: {action: "tags", id: transaction.id},
		}).done(function(response) {
			callback(response);
		});
	}

	this.allTags = function(callback) {
		$.ajax({
			url: this._url,
			dataType: "json",
			data: {action: "all_tags"},
		}).done(function(response) {
			callback(response);
		});
	}

	this.saveAccount = function(data, callback) {
		$.ajax({
			url: this._url,
			dataType: "json",
			data: data,
		}).done(function(response) {
			callback(response);
		});
	}

	this.currencies = function(callback) {
		$.ajax({
			url: this._url,
			dataType: "json",
			data: {action: "currencies"},
		}).done(function(response) {
			callback(response);
		});
	}
}*/
