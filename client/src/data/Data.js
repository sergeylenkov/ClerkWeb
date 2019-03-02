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
}