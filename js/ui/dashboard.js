function Dashboard() {
    var self = this;
    var view;

    this.load = function(container) {
        $.get("templates/dashboard.html", function(html) {
            view = $(html);
            container.append(view);

            data.accounts(data.accountType.deposit, true, function(accounts) {
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
            var amountItem = item.find(".account_balance");
            var amountInfoItem = item.find(".info");

            if (account.credit_limit) {
                var balance = account.credit_limit + response.balance;

                amountItem.html(balance.formatAmount());

                var sign = " + ";

                if (response.balance < 0) {
                    sign = " - ";
                }

                amountInfoItem.html("(" + account.credit_limit.formatAmount() + sign + Math.abs(response.balance).formatAmount() + ")");
            } else {
                amountInfoItem.hide();
                amountItem.html(response.balance.formatAmount());
            }
        });
    }
}
