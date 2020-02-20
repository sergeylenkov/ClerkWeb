export function transactions(url) {
  this.url = url;

  this.getAll = function(from, to) {
    return new Promise((resolve, reject) => {
      fetch(`${this.url}/transactions?from=${from.format("YYYY-MM-DD")}&to=${to.format("YYYY-MM-DD")}`).then((response) => {
        return response.json();
      }).then((data) => {
        resolve(data.items);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  this.getRecents = function(limit) {
    return new Promise((resolve, reject) => {
      fetch(`${this.url}/transactions/recent?limit=${limit}`).then((response) => {
        return response.json();
      }).then((data) => {
        resolve(data.items);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  this.save = function(transaction) {
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