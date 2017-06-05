function Dashboard() {
    var self = this;
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

            $("#budget_header").html("Бюджет за " + monthNames[Date.today().getMonth()]);

            data.budget(Date.today().moveToFirstDayOfMonth().toString("yyyy-MM-dd"), Date.today().moveToLastDayOfMonth().toString("yyyy-MM-dd"), function(budget) {
                $("#budget_receipt").html(budget.receipt.formatAmount());
                $("#budget_expense").html(budget.expense.formatAmount());
            });

            data.expenses(Date.today().moveToFirstDayOfMonth().toString("yyyy-MM-dd"), Date.today().moveToLastDayOfMonth().toString("yyyy-MM-dd"), function(expenses) {
                $.get("templates/dashboard-budget.html", function(html) {
                    for (var i = 0; i < expenses.length; i++) {
                        var expense = expenses[i];
                        var item = $(html);

                        item.find(".account_name").text(expense.name);
                        item.find(".account_balance").html(expense.sum.formatAmount());

                        $("#budget_list").append(item);
                    }
                });
            });
        });
    }

    this.balance = function(item, account) {
        data.accountBalance(account, function(response) {
            var amountItem = item.find(".account_balance").first();
            var amountInfoItem = item.find(".info");
            var progressBar = item.find(".account_progress_bar");
            var progressFill = item.find(".account_progress_fill");
            var percent = 0;

            if (account.credit_limit) {
                var balance = account.credit_limit + response.balance;

                amountItem.html(balance.formatAmount());

                var sign = " + ";

                if (response.balance < 0) {
                    sign = " - ";
                }

                amountInfoItem.html("(" + account.credit_limit.formatAmount() + sign + Math.abs(response.balance).formatAmount() + ")");

                percent = Math.abs(balance / account.credit_limit) * 100;

                progressFill.css("width", percent + "%");

                if (percent >= 80) {
                    progressFill.addClass("green");
                } else if (percent > 20 && percent < 70) {
                    progressFill.addClass("yellow");
                } else {
                    progressFill.addClass("red");
                }
            } else if (account.type_id == data.accountType.debt) {
                amountItem.html(response.balance.formatAmount());
                amountInfoItem.html("(" + response.expense.formatAmount() + " - " + Math.abs(response.receipt).formatAmount() + ")");

                amountItem.addClass("minus");

                percent = Math.abs(response.balance / response.expense) * 100;

                progressFill.css("width", percent + "%");

                if (percent <= 20) {
                    progressFill.addClass("green");
                } else if (percent > 20 && percent <= 70) {
                    progressFill.addClass("yellow");
                } else {
                    progressFill.addClass("red");
                }
            } else {
                amountInfoItem.hide();
                progressBar.hide();
                amountItem.html(response.balance.formatAmount());
            }
        });
    }
}
