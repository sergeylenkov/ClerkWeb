import React from 'react';
import { formatAmount } from '../../../Utils.js';

import styles from './index.module.css';

export default class ExpensesTooltip extends React.Component {
    render() {
        const { active, payload } = this.props;

        if (active) {
            const { date, total, expenses } = payload[0].payload;
            const formattedDate = date.format('MMM YYYY');

            return (
                <div className={styles.container}>
                    <div className={styles.header}>
                        <div className={styles.date}>{formattedDate}</div>
                        <div className={styles.total}>{formatAmount(total, 'RUB')}</div>
                    </div>
                    <div className={styles.content}>
                    {
                        expenses.map((item, i) => {
                            return (
                                <div className={styles.item} key={i}>
                                    <div className={styles.name}>{item.name}</div>
                                    <div className={styles.amount}>{formatAmount(item.amount, 'RUB')}</div>
                                </div>
                            );
                        })
                    }
                    </div>
                </div>
            )
        }

        return null;
    }
}