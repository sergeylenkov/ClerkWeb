export function reports(url) {
  this.url = url;

  this.getExpensesByMonth = function(from, to) {
    return new Promise((resolve, reject) => {
      fetch(`${this.url}/reports/expenses/by_month?from=${from.format("YYYY-MM-DD")}&to=${to.format("YYYY-MM-DD")}`).then((response) => {
        return response.json();
      }).then((data) => {
        resolve(data.items);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  this.getExpensesByAccount = function(from, to) {
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