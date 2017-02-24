import styles from "./summary.css";

export default class DashboardSummary {
    constructor() {
        this._view = document.createElement("div");
        this._view.className = styles.container;

        this.createSummaryView();
    }

    appendTo(container) {
        container.appendChild(this._view);
    }

    createSummaryView() {
        let summaryContainer = document.createElement("div");
        summaryContainer.className = styles.summaryContainer;
        this._view.appendChild(summaryContainer);

        let item = document.createElement("div");
        item.className = styles.item;

        summaryContainer.appendChild(item);

        let title = document.createElement("div");
        title.className = styles.title;
        title.innerText = "СОБСТВЕННЫЕ СРЕДСТВА";

        item.appendChild(title);

        this._avaiableAmount = document.createElement("div");
        this._avaiableAmount.className = styles.amount;
        this._avaiableAmount.innerText = "0";

        item.appendChild(this._avaiableAmount);

        item = document.createElement("div");
        item.className = styles.item;

        summaryContainer.appendChild(item);

        title = document.createElement("div");
        title.className = styles.title;
        title.innerText = "КРЕДИТНЫЕ СРЕДСТВА";

        item.appendChild(title);

        this._creditAmount = document.createElement("div");
        this._creditAmount.className = styles.amount;
        this._creditAmount.innerText = "0";

        item.appendChild(this._creditAmount);

        item = document.createElement("div");
        item.className = styles.item;

        summaryContainer.appendChild(item);

        title = document.createElement("div");
        title.className = styles.title;
        title.innerText = "ВСЕГО";

        item.appendChild(title);

        this._totalAmount = document.createElement("div");
        this._totalAmount.className = styles.amount;
        this._totalAmount.innerText = "0";

        item.appendChild(this._totalAmount);
    }

    update() {
        let self = this;

        data.availableAmounts(function(accounts) {
            console.log('amounts');
            console.log(accounts);
            if (accounts) {
                var available = 0;
                var credit = 0;
                var total = 0;

                for (var i = 0; i < accounts.length; i++) {
                    let account = accounts[i];

                    if (account.credit_limit > 0) {
                        credit = credit + (account.credit_limit + account.balance);
                    } else {
                        available = available + account.balance;
                    }
                }

                total = available + credit;

                self._avaiableAmount.innerText = available.toFixed(2);
                self._creditAmount.innerText = credit.toFixed(2);
                self._totalAmount.innerText = total.toFixed(2);

                /*var amounts = {};

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
                }*/
            }
        });
    }
}
