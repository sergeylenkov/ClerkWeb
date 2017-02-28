import View from "../base/view.js";
import styles from "./summary.css";

export default class DashboardSummary extends View {
    constructor() {
        super();

        this._view.className = styles.container;
        this.createSummaryView();
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
            }
        });
    }
}
