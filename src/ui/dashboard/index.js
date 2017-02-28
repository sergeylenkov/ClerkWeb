import View from "../base/view.js";
import DashboardMenu from "./menu.js";
import DashboardSummary from "./summary.js";
import DashboardAccounts from "./accounts.js";
import styles from "./index.css";

export class Dashboard extends View {
    constructor() {
        super();

        let self = this;

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

        this._menu.setDelegate({
            didSelectItem: function(index) {
                self._summary.detach();
                self._accounts.detach();

                if (index == 0) {
                    self._summary.appendTo(self._summaryView);
                } else if (index == 1) {
                    self._accounts.appendTo(self._summaryView);
                }
            }
        })

        this._summary = new DashboardSummary();
        this._summary.appendTo(this._summaryView);

        this._accounts = new DashboardAccounts();
    }

    update() {
        this._summary.update();
        this._accounts.update();
    }

    /*update() {
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
