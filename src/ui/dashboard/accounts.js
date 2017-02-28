import View from "../base/view.js";
import styles from "./accounts.css";

export default class DashboardAccounts extends View {
    constructor() {
        super();

        this._view.className = styles.container;

        this._accountsList = document.createElement("div");
        this._accountsList.className = styles.list;

        this._view.appendChild(this._accountsList);
    }

    update() {
        let self = this;

        data.availableAmounts(function(accounts) {
            self._accountsList.innerHTML = "";

            if (accounts) {
                for (var i = 0; i < accounts.length; i++) {
                    self._accountsList.appendChild(self.accountItem(accounts[i]));
                }
            }
        });
    }

    accountItem(account) {
        let item = document.createElement("div");
        item.className = styles.accountItem;

        let name = document.createElement("div");
        name.className = styles.accountName;
        name.innerText = account.name;

        item.appendChild(name);

        let amount = document.createElement("div");
        amount.className = styles.accountAmount;

        if (account.credit_limit > 0) {
            let balance = account.credit_limit + account.balance;
            amount.innerText = balance.toFixed(2) + " (" + account.credit_limit.toFixed(2) + " " + account.balance.toFixed(2) + ")";
        } else {
            amount.innerText = account.balance.toFixed(2);
        }

        item.appendChild(amount);

        return item;
    }
}
