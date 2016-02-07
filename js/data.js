function Data(url) {
	this._url = url;
	this.accountType = {receipt: 0, deposit: 1, expense: 2, credit: 3};

	this.accounts = function(type, active, callback) {
        $.ajax({
            url: this._url,
            dataType: "json",
            data: { action: "accounts", type: type, active: active ? 1 : 0 },
        }).done(function(response) {
			callback(response);
		});
    }

	this.budget = function(from, to, callback) {
	    $.ajax({
	        url: this._url,
	        dataType: "json",
	        data: { action: "budget", from: from, to: to },
	    }).done(function (response) {
			callback(response);
		});
	}

	this.expenses = function(from, to, callback) {
	    $.ajax({
	        url: this._url,
	        dataType: "json",
	        data: { action: "expenses", from: from, to: to },
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

	this.expensesByMonth = function(callback) {
        $.ajax({
            url: this._url,
            dataType: "json",
            data: { action: "expenses_by_month" },
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
}
