import DashboardMenu from "./menu.js";
import styles from "./index.css";

export class Dashboard {
    constructor() {
        this._view = document.createElement("div");
        this._view.className = styles.container;

        this._summaryView = document.createElement("div");
        this._summaryView.className = styles.summaryContainer;
        this._view.appendChild(this._summaryView);

        this._transactionsView = document.createElement("div");
        this._transactionsView.className = styles.transactionsContainer;
        this._view.appendChild(this._transactionsView);

        this._menu = new DashboardMenu();
        this._menu.appendTo(this._summaryView);

        this._menu.setSelectedItem(0, true);
    }

    appendTo(container) {
        container.appendChild(this._view);
    }

    /*update() {
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
    }*/
}
