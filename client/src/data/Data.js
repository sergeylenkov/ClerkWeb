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
            fetch(`${this.url}/dashboard/expenses?from=${from.format("YYYY-DD-MM")}&to=${to.format("YYYY-DD-MM")}`).then((response) => {
                return response.json();
            }).then((data) => {
                resolve(data.items);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}