export const AccountTypes = {
  Receipts: 0,
  Deposits: 1,
  Expenses: 2,
  Debts: 3,
  Virtual: 4
}

export function accounts(url) {
  this.url = url;
  this.accounts = [];

  this.getAll = function() {
    return new Promise((resolve, reject) => {
      if (this.accounts.length > 0) {
        resolve(this.accounts);
      } else {
        fetch(`${this.url}/accounts`).then((response) => {
          return response.json();
        }).then((data) => {
          resolve(data.items);
        }).catch((error) => {
          reject(error);
        });
      }
    });
  }
}