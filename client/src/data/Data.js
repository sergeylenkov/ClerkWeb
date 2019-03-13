export class DataHelper {
    constructor() {
        this.url = 'http://localhost:5000';
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
}