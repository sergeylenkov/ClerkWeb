export const AccountTypes = {
    Receipts: 0,
    Deposits: 1,
    Expenses: 2,
    Credits: 4,
    Virtaul: 5
}

export const BudgetTypes = {
    Week:  0,
	Month: 1,
	Year: 2,
	Custom: 3
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

    budgets() {
        return new Promise((resolve, reject) => {
            fetch(`${this.url}/budgets`).then((response) => {
                return response.json();
            }).then((data) => {
                resolve(data.items);
            }).catch((error) => {
                reject(error);
            });
        });
    }
    
    dashboardBalance() {
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

    dashboardExpenses(from, to) {
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

    dashboardBudgets(from, to) {
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

    dashboardGoals() {
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

    dashboardCredits() {
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

    recentTransactions(limit) {
        return new Promise((resolve, reject) => {
            fetch(`${this.url}/transactions/recent?limit=${limit}`).then((response) => {
                return response.json();
            }).then((data) => {
                resolve(data.items);
            }).catch((error) => {
                console.log(error);            
            });
        });
    }    
}