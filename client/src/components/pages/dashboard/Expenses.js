import React from 'react';
import { formatAmount } from '../../Utils.js';

import styles from './Expenses.module.css';

export class DashboardExpenses extends React.Component {
    render() {
        if (this.props.expenses.length === 0) {
            return null;
        }

        return (                
            <div className={styles.container}>
                <div className={styles.header}>Expenses</div>

                {
                    this.props.expenses.map((item, i) => {
                        return (
                            <div key={item.id} className={styles.item}>
                                <div className={styles.name}>{item.name}</div><div className={styles.amount}>{formatAmount(item.amount, item.currency)}</div>
                            </div>
                        ); 
                    })
                }
            </div>
        )
    }
}