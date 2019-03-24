import React from 'react';
import { formatAmount } from '../../Utils.js';

import styles from './Deposits.module.css';

export class DashboardDeposits extends React.Component {
    render() {
        return (                
            <div className={styles.container}>
                <div className={styles.header}>Balance</div>

                {
                    this.props.accounts.map((item, i) => {
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