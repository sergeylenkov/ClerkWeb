import React from 'react';

const currencySign = {
    'RUB': '₽',
    'USD': '$',
    'EUR': '€'
}

export function formatAmount(value, currency='RUB') {    
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

    const sign = currencySign[currency];
    console.log(formatted, fraction, sign);
    return <span><span>{formatted}</span><span className='fraction'>.{fraction}</span> {sign}</span>;
}