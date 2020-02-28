import { isEmpty } from 'utils';

export function exchange(url) {
  this.url = url;
  this.exchangeRates = {};

  this.getExchangeRates = function() {
    return new Promise((resolve, reject) => {
      if (!isEmpty(this.exchangeRates)) {
        resolve(this.exchangeRates);
      } else {
        fetch(`${this.url}/exchangeRates`).then((response) => {
          return response.json();
        }).then((data) => {
          this.exchangeRates = data.items;
          resolve(this.exchangeRates);
        });
      }
    });
  }

  this.convert = function(from, to, amount) {
    if (from === to) {
        return amount;
    }

    let rate = 1;

    if (this.exchangeRates[`${from}_${to}`]) {
        rate = this.exchangeRates[`${from}_${to}`];
    }

    return amount * rate;
  }
}