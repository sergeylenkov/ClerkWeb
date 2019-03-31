import React from 'react';
import moment from 'moment';
import { formatAmount } from '../../Utils.js';

import styles from './Item.module.css';

export class GoalsListItem extends React.Component {
    render() {
        let date = moment(this.props.item.date);

        return (                
            <div className={styles.container}>
                <div className={styles.name}>{this.props.item.name}</div>
                <div className={styles.date}>{date.format('MMM D, YYYY')}</div>
                <div className={styles.amount}>{formatAmount(this.props.item.amount, '')}</div>
            </div>
        );
    }
}