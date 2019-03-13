import React from 'react';
import { formatAmount } from '../../Utils.js';

import styles from './Budgets.module.css';

export class DashboardBudgets extends React.Component {
    render() {
        return (                
            <div className={styles.container}>
                <div className={styles.header}>Бюджет</div>

                {
                    this.props.budgets.map((item, i) => {
                        return (
                            <div key={item.id} className={styles.item}>
                                <div className={styles.name}>{item.name}</div>
                                <div className={styles.expense}>{formatAmount(item.expense, item.currency)}</div>
                                <div className={styles.amount}>{formatAmount(item.amount, item.currency)}</div>
                            </div>
                        ); 
                    })
                }
            </div>
        )
    }
}