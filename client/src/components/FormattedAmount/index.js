import React from 'react';

const currencySign = {
  'RUB': '₽',
  'USD': '$',
  'EUR': '€'
}

class FormattedAmount extends React.Component {
  render() {
    const { amount, currency, withFraction = true } = this.props;
    let value = amount;

    value = value.toFixed(2).toString();
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
      return <span><span>{formatted}</span><span>.{fraction}</span> {sign}</span>
    }

    return <span><span>{formatted}</span> {sign}</span>
  }
}

export default FormattedAmount;