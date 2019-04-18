import React from 'react';
import moment from 'moment';
import { formatAmount } from '../../Utils.js';

import styles from './Expenses.module.css';

export class DashboardExpenses extends React.Component {
    render() {
        if (this.props.expenses.length === 0) {
            return null;
        }

        let max = 0;

        this.props.expenses.forEach(item => {
            if (item.amount > max) {
                max = item.amount;
            }
        });

        return (                
            <div className={styles.container}>
                <div className={styles.header}>Expenses <span className={styles.month}>{moment().format('MMMM')}</span></div>

                {
                    this.props.expenses.map((item, i) => {
                        const percent = (item.amount / max) * 100;

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