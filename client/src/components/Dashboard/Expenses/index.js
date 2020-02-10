import React from 'react';
import moment from 'moment';
import { formatAmount } from 'components/Utils';

import styles from './index.module.css';

export class DashboardExpenses extends React.Component {
    render() {
        const { expenses, totalExpenses } = this.props;

        if (expenses.length === 0) {
            return null;
        }

        let max = 0;

        expenses.forEach(item => {
            if (item.amount > max) {
                max = item.amount;
            }
        });

        return (
            <div className={styles.container}>
                <div className={styles.header}>Expenses<span className={styles.month}>{moment().format('MMMM')}</span> <div className={styles.totalAmount}>{formatAmount(totalExpenses.amount, totalExpenses.currency)}</div></div>

                {
                    expenses.map((item, i) => {
                        let percent = (item.amount / max) * 100;

                        if (percent < 1) {
                            percent = 1;
                        }

                        let progressStyle = {
                            width: `${percent}%`
                        }

                        return (
                            <div key={item.id} className={styles.item}>
                                <div className={styles.info}>
                                    <div className={styles.name}>{item.name}</div><div className={styles.amount}>{formatAmount(item.amount, item.currency)}</div>
                                </div>
                                <div className={styles.progress} style={progressStyle}></div>
                            </div>
                        );
                    })
                }
            </div>
        )
    }
}