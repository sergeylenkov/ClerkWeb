export function dashboard(url) {
  this.url = url;

  this.getBalance = function() {
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

  this.getExpenses = function(from, to) {
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

  this.getReceipts = function(from, to) {
    return new Promise((resolve, reject) => {
      fetch(`${this.url}/dashboard/receipts?from=${from.format("YYYY-MM-DD")}&to=${to.format("YYYY-MM-DD")}`).then((response) => {
        return response.json();
      }).then((data) => {
        resolve(data.items);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  this.getBudgets = function(from, to) {
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

  this.getGoals = function() {
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

  this.getDebts = function() {
    return new Promise((resolve, reject) => {
      fetch(`${this.url}/dashboard/debts`).then((response) => {
        return response.json();
      }).then((data) => {
        resolve(data.items);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  this.getSchedulers = function(from, to) {
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