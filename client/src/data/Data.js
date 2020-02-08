export const AccountTypes = {
    Receipts: 0,
    Deposits: 1,
    Expenses: 2,
    Debts: 3,
    Virtual: 4
}

export const BudgetTypes = {
    Week:  0,
	Month: 1,
	Year: 2,
	Custom: 3
}

export let _exchangeRates = null;

export default class Data {
    constructor() {
        this.url = 'http://localhost:5000';
    }

    reports = {
        getExpensesByMonth: (from, to) => {
            return new Promise((resolve, reject) => {
                fetch(`${this.url}/reports/expenses/by_month?from=${from.format("YYYY-MM-DD")}&to=${to.format("YYYY-MM-DD")}`).then((response) => {
                    return response.json();
                }).then((data) => {
                    resolve(data.items);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        getExpensesByAccount: (from, to) => {
            return new Promise((resolve, reject) => {
                fetch(`${this.url}/reports/expenses/by_account?from=${from.format("YYYY-MM-DD")}&to=${to.format("YYYY-MM-DD")}`).then((response) => {
                    return response.json();
                }).then((data) => {
                    resolve(data.items);
                }).catch((error) => {
                    reject(error);
                });
            });
        }
    }

    accounts = {
        getAll: () => {
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
    }

    budgets = {
        getAll: (from, to) => {
            return new Promise((resolve, reject) => {
                fetch(`${this.url}/budgets?from=${from.format("YYYY-MM-DD")}&to=${to.format("YYYY-MM-DD")}`).then((response) => {
                    return response.json();
                }).then((data) => {
                    resolve(data.items);
                }).catch((error) => {
                    reject(error);
                });
            });
        }
    }

    goals = {
        getAll: () => {
            return new Promise((resolve, reject) => {
                fetch(`${this.url}/goals`).then((response) => {
                    return response.json();
                }).then((data) => {
                    resolve(data.items);
                }).catch((error) => {
                    reject(error);
                });
            });
        }
    }

    schedulers = {
        getAll: () => {
            return new Promise((resolve, reject) => {
                fetch(`${this.url}/schedulers`).then((response) => {
                    return response.json();
                }).then((data) => {
                    resolve(data.items);
                }).catch((error) => {
                    reject(error);
                });
            });
        }
    }

    tags = {
        getAll: () => {
            return new Promise((resolve, reject) => {
                fetch(`${this.url}/tags`).then((response) => {
                    return response.json();
                }).then((data) => {
                    resolve(data.items);
                }).catch((error) => {
                    reject(error);
                });
            });
        }
    }

    dashboard = {
        getBalance: () => {
            return new Promise((resolve, reject) => {
                fetch(`${this.url}/dashboard/balance`).then((response) => {
                    return response.json();
                }).then((data) => {
                    resolve(data.items);
                }).catch((error) => {
                    reject(error);
                });
            });
        },

        getExpenses: (from, to) => {
            return new Promise((resolve, reject) => {
                fetch(`${this.url}/dashboard/expenses?from=${from.format("YYYY-MM-DD")}&to=${to.format("YYYY-MM-DD")}`).then((response) => {
                    return response.json();
                }).then((data) => {
                    resolve(data.items);
                }).catch((error) => {
                    reject(error);
                });
            });
        },

        getBudgets: (from, to) => {
            return new Promise((resolve, reject) => {
                fetch(`${this.url}/dashboard/budgets?from=${from.format("YYYY-MM-DD")}&to=${to.format("YYYY-MM-DD")}`).then((response) => {
                    return response.json();
                }).then((data) => {
                    resolve(data.items);
                }).catch((error) => {
                    reject(error);
                });
            });
        },

        getGoals: () => {
            return new Promise((resolve, reject) => {
                fetch(`${this.url}/dashboard/goals`).then((response) => {
                    return response.json();
                }).then((data) => {
                    resolve(data.items);
                }).catch((error) => {
                    reject(error);
                });
            });
        },

        getDebts: () => {
            return new Promise((resolve, reject) => {
                fetch(`${this.url}/dashboard/debts`).then((response) => {
                    return response.json();
                }).then((data) => {
                    resolve(data.items);
                }).catch((error) => {
                    reject(error);
                });
            });
        },

        getSchedulers: (from, to) => {
            return new Promise((resolve, reject) => {
                fetch(`${this.url}/dashboard/schedulers?from=${from.format("YYYY-MM-DD")}&to=${to.format("YYYY-MM-DD")}`).then((response) => {
                    return response.json();
                }).then((data) => {
                    resolve(data.items);
                }).catch((error) => {
                    reject(error);
                });
            });
        }
    }

    transactions = {
        getAll: (from, to) => {
            return new Promise((resolve, reject) => {
                fetch(`${this.url}/transactions?from=${from.format("YYYY-MM-DD")}&to=${to.format("YYYY-MM-DD")}`).then((response) => {
                    return response.json();
                }).then((data) => {
                    resolve(data.items);
                }).catch((error) => {
                    reject(error);
                });
            });
        },

        getRecents: (limit) => {
            return new Promise((resolve, reject) => {
                fetch(`${this.url}/transactions/recent?limit=${limit}`).then((response) => {
                    return response.json();
                }).then((data) => {
                    resolve(data.items);
                }).catch((error) => {
                    reject(error);
                });
            });
        },

        save: (transaction) => {
            return new Promise((resolve, reject) => {
                fetch(`${this.url}/transactions/`, {
                    method: 'POST',
                    body: JSON.stringify(transaction),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                    return response.json();
                }).then((data) => {
                    resolve(data);
                }).catch((error) => {
                    console.log(error);
                });
            });
        }
    }

    exchange = {
        getExchangeRates: () => {
            return new Promise((resolve, reject) => {
                if (_exchangeRates) {
                    resolve(_exchangeRates);
                } else {
                    fetch(`${this.url}/exchangeRates`).then((response) => {
                        return response.json();
                    }).then((data) => {
                        _exchangeRates = data.items;
                        resolve(_exchangeRates);
                    });
                }
            });
     }
    }
}