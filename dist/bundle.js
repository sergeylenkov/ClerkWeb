/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _helper = __webpack_require__(1);

	var _menu = __webpack_require__(3);

	var data = new _helper.DataHelper('api.php');
	var menu;

	data.accounts(function (response) {
	    console.log('data:accounts');
	    console.log(response);
	    menu = new _menu.Menu(response);
	    menu.show(document.getElementById('main'));
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.DataHelper = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _api = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DataHelper = exports.DataHelper = function () {
		function DataHelper(url) {
			_classCallCheck(this, DataHelper);

			this.api = new _api.ApiRequest(url);
			console.log('DataHelper ' + url);
		}

		_createClass(DataHelper, [{
			key: 'accounts',
			value: function accounts(callback) {
				this.api.get('accounts', callback);
			}
		}]);

		return DataHelper;
	}();

	/*	this._url = url;
		this.accountType = {receipt: 0, deposit: 1, expense: 2, credit: 3, debt: 4};

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

		this.availableAmounts = function(callback) {
			$.ajax({
				url: this._url,
				dataType: "json",
				data: {action: "available_amounts"},
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

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ApiRequest = exports.ApiRequest = function () {
		function ApiRequest(url) {
			_classCallCheck(this, ApiRequest);

			this.url = url;
			console.log('ApiRequest ' + url);
		}

		_createClass(ApiRequest, [{
			key: 'get',
			value: function get(action, callback) {
				if (this.makeRequest(callback)) {
					var url = this.url + '?action=' + action;
					console.log('get ' + url);
					this.request.open('get', url, true);
					this.request.send();
				}
			}
		}, {
			key: 'post',
			value: function post(action, data, callback) {
				if (this.makeRequest(callback)) {
					var url = this.url + '?action=' + action;
					console.log('post ' + url);
					this.request.open('post', url, true);
					this.request.setRequestHeader('content-type', 'application/json;charset=UTF-8');
					this.request.send(JSON.stringify(data));
				}
			}
		}, {
			key: 'makeRequest',
			value: function makeRequest(callback) {
				var self = this;
				this.request = new XMLHttpRequest();

				if (!this.request) {
					console.log('create requets error');
					return false;
				}

				this.request.responseType = 'json';
				this.request.onreadystatechange = function () {
					console.log('requestStateChange ' + self.request.readyState + ' ' + self.request.status);
					if (self.request.readyState === XMLHttpRequest.DONE) {
						if (self.request.status === 200) {
							if (callback) {
								callback(self.request.response);
							}
						} else {
							console.log('request error');
							if (callback) {
								callback(null);
							}
						}
					}
				};

				return true;
			}
		}]);

		return ApiRequest;
	}();

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Menu = exports.Menu = function () {
		function Menu(accounts) {
			_classCallCheck(this, Menu);

			this.view = document.createElement('div');

			var header = this.header('', 'Dashboard', false);
			this.view.appendChild(header);

			header = this.header('', 'Deposits', true);
			this.view.appendChild(header);

			header = this.header('', 'Receipts', true);
			this.view.appendChild(header);

			header = this.header('', 'Expenses', true);
			this.view.appendChild(header);

			header = this.header('', 'Credits', true);
			this.view.appendChild(header);

			header = this.header('', 'Report', false);
			this.view.appendChild(header);

			header = this.header('', 'Budget', false);
			this.view.appendChild(header);
		}

		_createClass(Menu, [{
			key: 'show',
			value: function show(container) {
				container.appendChild(this.view);
			}
		}, {
			key: 'header',
			value: function header(icon, text, expanded) {
				var item = document.createElement('div');
				item.className += 'menu-item';

				var iconElement = document.createElement('div');
				iconElement.className += 'menu-item-icon';
				item.appendChild(iconElement);

				var titleElement = document.createElement('div');
				titleElement.className += 'menu-item-title';
				var node = document.createTextNode(text);
				titleElement.appendChild(node);

				item.appendChild(titleElement);

				if (expanded) {
					var expandButton = document.createElement('div');
					expandButton.className += 'menu-item-button';
					item.appendChild(expandButton);
				}

				return item;
			}
		}]);

		return Menu;
	}();

/***/ }
/******/ ]);