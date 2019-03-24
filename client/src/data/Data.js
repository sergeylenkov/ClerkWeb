export const AccountsTypes = {
    Receipts: 0,
    Deposits: 1,
    Expenses: 2,
    Credits: 4,
    Virtaul: 5
}

export class DataHelper {
    constructor() {
        this.url = 'http://localhost:5000';
    }

    accounts() {
        return new Promise((resolve, reject) => {
            fetch(`${this.url}/accounts`).then((response) => {
                return response.json();
            }).then((data) => {
                resolve(data.items);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    balance() {
        return new Promise((resolve, reject) => {
            fetch(`${this.url}/dashboard/balance`).then((response) => {
                return response.json();
            }).then((data) => {
                resolve(data.items);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    expenses(from, to) {
        return new Promise((resolve, reject) => {
            fetch(`${this.url}/dashboard/expenses?from=${from.format("YYYY-MM-DD")}&to=${to.format("YYYY-MM-DD")}`).then((response) => {
                return response.json();
            }).then((data) => {
                resolve(data.items);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    budgets(from, to) {
        return new Promise((resolve, reject) => {
            fetch(`${this.url}/dashboard/budgets?from=${from.format("YYYY-MM-DD")}&to=${to.format("YYYY-MM-DD")}`).then((response) => {
                return response.json();
            }).then((data) => {
                resolve(data.items);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    goals() {
        return new Promise((resolve, reject) => {
            fetch(`${this.url}/dashboard/goals`).then((response) => {
                return response.json();
            }).then((data) => {
                resolve(data.items);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    credits() {
        return new Promise((resolve, reject) => {
            fetch(`${this.url}/dashboard/credits`).then((response) => {
                return response.json();
            }).then((data) => {
                resolve(data.items);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    transactions(from, to) {
        return new Promise((resolve, reject) => {
            fetch(`${this.url}/transactions?from=${from.format("YYYY-MM-DD")}&to=${to.format("YYYY-MM-DD")}`).then((response) => {
                return response.json();
            }).then((data) => {
                resolve(data.items);
            }).catch((error) => {
                console.log(error);            
            });
        });
    }
}