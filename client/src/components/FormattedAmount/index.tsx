import React, { Component } from 'react';

const currencySign: {[key: string]: string} = {
  'RUB': '₽',
  'USD': '$',
  'EUR': '€'
}

interface FormattedAmountProps {
  amount: number;
  currency: string;
  withFraction: boolean;
}

class FormattedAmount extends Component<FormattedAmountProps> {
  render() {
    const { amount, currency, withFraction = true } = this.props;

    let value = amount.toFixed(2).toString();
    value = value.trim().replace(' ', '').replace(',', '.');

    const values = value.split('.');
    const integer = values[0];
    const fraction = values[1];
    let formatted = '';
    let count = 0;

    for (let i = integer.length - 1; i >= 0; i--) {
      formatted = formatted + integer[i];
      count++;

      if (count === 3) {
        formatted = formatted + ' ';
        count = 0;
      }
    }

    formatted = formatted.split('').reverse().join('');
    formatted = formatted.replace('- ', '-');

    const sign = currencySign[currency];

    if (withFraction) {
      return `${formatted}.${fraction} ${sign}`;
    }

    return `${formatted} ${sign}`
  }
}

export default FormattedAmount;