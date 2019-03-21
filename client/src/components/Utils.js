import React from 'react';
import moment from 'moment';

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
    
    return <span><span>{formatted}</span><span className='fraction'>.{fraction}</span> {sign}</span>;
}

export function formatDate(date) {
    date = moment(date);

    const now = moment();
    const week = moment().startOf('week');
    
    let formatted = date.format('MMM D, YYYY');

    const isToday = now.isSame(date, 'year') && now.isSame(date, 'month') && now.isSame(date, 'day');
    const isWeek = date.isSameOrAfter(week);
    
    if (isToday) {
        formatted = 'Today';
    } else if (isWeek) {
        formatted = date.format('dddd');
    } else if (now.isSame(date, 'year')) {
        formatted = date.format('MMM D');
    }

    return <span>{formatted}</span>
}