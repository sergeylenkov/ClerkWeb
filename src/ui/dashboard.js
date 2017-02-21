export class Dashboard {
    constructor() {
        this.view = document.createElement('div');
        this.view.id = 'dashboard';

        this.view.appendChild(this.balanceView());
        this.view.appendChild(this.budgetView());
    }

    balanceView() {
        let view = document.createElement('div');
        view.setAttribute('id', 'dashboard_balance');

        let header = document.createElement('div');
        header.className = 'header';
        header.innerText = 'Баланс';

        view.appendChild(header);

        this.balanceList = document.createElement('div');
        this.balanceList.id = 'dashboard_balance_list';

        view.appendChild(this.balanceList);

        return view;
    }

    balanceItem(amount, currency) {
        let view = document.createElement('div');
        view.className = 'amount_item';

        let amountElement = document.createElement('span');
        amountElement.className = 'amount';
        amountElement.innerHTML = amount;

        let currencyElement = document.createElement('span');
        currencyElement.className = 'currency';
        currencyElement.innerHTML = currency;

        view.appendChild(amountElement);
        view.appendChild(currencyElement);

        return view;
    }

    accountsView() {
        let view = document.createElement('div');

        return view;
    }

    budgetView() {
        let view = document.createElement('div');
        view.className = 'dashboard_budget';

        this.budgetHeader = document.createElement('div');
        this.budgetHeader.className = 'dashboard_budget_header';

        let budgetTotal = document.createElement('div');
        budgetTotal.className = 'dashboard_budget_total';

        let budgetTotalItem = document.createElement('p');
        budgetTotalItem.className = 'budget';
        budgetTotalItem.innerText = 'Приход — ';

        budgetTotal.appendChild(budgetTotalItem);

        this.budgetReceipt = document.createElement('span');
        this.budgetReceipt.className = 'account_balance budget';

        budgetTotalItem.appendChild(this.budgetReceipt);

        budgetTotalItem = document.createElement('p');
        budgetTotalItem.className = 'budget';
        budgetTotalItem.innerText = 'Расход — ';

        budgetTotal.appendChild(budgetTotalItem);

        this.budgetExpense = document.createElement('span');
        this.budgetExpense.className = 'account_balance budget';

        budgetTotalItem.appendChild(this.budgetExpense);

        this.budgetList = document.createElement('div');
        this.budgetList.className = 'dashboard_budget_list';

        view.appendChild(this.budgetHeader);
        view.appendChild(budgetTotal);
        view.appendChild(this.budgetList);

        return view;
    }

    budgetItem(name, amount) {
        let view = document.createElement('div');
        view.className = 'budget_item';

        let nameElement = document.createElement('p');
        nameElement.className = 'account_name budget';
        nameElement.innerHTML = name;

        let amountElement = document.createElement('span');
        amountElement.className = 'account_balance budget';
        amountElement.innerHTML = amount.formatAmount();

        view.appendChild(nameElement);
        view.appendChild(amountElement);

        return view;
    }

    show(container) {
        container.appendChild(this.view);
    }

    update() {
        let self = this;

        self.balanceList.innerHTML = '';
        self.budgetList.innerHTML = '';

        data.availableAmounts(function(accounts) {
            console.log('amounts');
            if (accounts) {
                var amounts = {};

                for (var i = 0; i < accounts.length; i++) {
                    var account = accounts[i];

                    if (account.credit_limit > 0) {
                        continue;
                    }

                    if (amounts[account.currency_id]) {
                        amounts[account.currency_id].balance = amounts[account.currency_id].balance + account.balance;
                    } else {
                        amounts[account.currency_id] = { 'balance': account.balance, 'currency': account.currency_name };
                    }
                }
                console.log(amounts);
                for (var k in amounts) {
                    let amount = amounts[k].balance.formatAmount(false);
                    let currency = amounts[k].currency.replaceCurrencyNameWithSign();

                    self.balanceList.appendChild(self.balanceItem(amount, currency));
                }
            }
        });

        this.budgetHeader.innerHTML = 'Бюджет за ' + monthNames[Date.today().getMonth()];

        data.budget(Date.today().moveToFirstDayOfMonth().toString('yyyy-MM-dd'), Date.today().moveToLastDayOfMonth().toString('yyyy-MM-dd'), function(budget) {
            console.log('budget');
            console.log(budget);
            if (budget) {
                self.budgetReceipt.innerHTML = budget.receipt.formatAmount();
                self.budgetExpense.innerHTML = budget.expense.formatAmount();
            }
        });

        data.expenses(Date.today().moveToFirstDayOfMonth().toString('yyyy-MM-dd'), Date.today().moveToLastDayOfMonth().toString('yyyy-MM-dd'), function(expenses) {
            console.log('expenses');
            console.log(expenses);
            if (expenses) {
                for (var i = 0; i < expenses.length; i++) {
                    var expense = expenses[i];
                    self.budgetList.appendChild(self.budgetItem(expense.name, expense.sum));
                }
            }
        });
    }
}

    /*var self = this;
    var view;

    this.load = function(container) {
        $.get("templates/dashboard.html", function(html) {
            view = $(html);
            container.append(view);

            data.availableAmounts(function(accounts) {
                var amounts = {};

                for (var i = 0; i < accounts.length; i++) {
                    var account = accounts[i];

                    if (account.credit_limit > 0) {
                        continue;
                    }

                    if (amounts[account.currency_id]) {
                        amounts[account.currency_id].balance = amounts[account.currency_id].balance + account.balance;
                    } else {
                        amounts[account.currency_id] = { "balance": account.balance, "currency": account.currency_name };
                    }
                }

                $.get("templates/dashboard-amount.html", function(html) {
                    for (var k in amounts) {
                        var item = $(html);
                        item.find(".balance").html(amounts[k].balance.formatAmount(false));
                        item.find(".currency").html(replaceCurrencyNameWithSign(amounts[k].currency));

                        $("#dashboard_available_amount").append(item);
                    }
                });
            });

            data.accounts(data.accountType.deposit, true, function(result) {
                var accounts = result;

                data.accounts(data.accountType.debt, true, function(result) {
                    accounts = accounts.concat(result);

                    $.get("templates/dashboard-account.html", function(html) {
                        for (var i = 0; i < accounts.length; i++) {
                            var item = $(html);
                            item.attr("index", accounts[i].id);
                            item.find(".account_name").text(accounts[i].name);

                            $("#dashboard_accounts").append(item);

                            self.balance(item, accounts[i]);
                        }
                    });
                });
            });


        });
    }

    this.balance = function(item, account) {
        data.accountBalance(account, function(response) {
            var amountItem = item.find(".account_balance").first();
            var amountInfoItem = item.find(".info");

            if (account.credit_limit) {
                var balance = account.credit_limit + response.balance;

                amountItem.html(balance.formatAmount());

                var sign = " + ";

                if (response.balance < 0) {
                    sign = " - ";
                }

                amountInfoItem.html("(" + account.credit_limit.formatAmount() + sign + Math.abs(response.balance).formatAmount() + ")");
            } else if (account.type_id == data.accountType.debt) {
                amountItem.html(response.balance.formatAmount());
                amountInfoItem.html("(" + response.expense.formatAmount() + " - " + Math.abs(response.receipt).formatAmount() + ")");

                amountItem.addClass("minus");
            } else {
                amountInfoItem.hide();
                amountItem.html(response.balance.formatAmount());
            }
        });
    }
}*/
