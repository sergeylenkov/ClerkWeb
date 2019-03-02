import React from 'react';

import styles from './Deposits.module.css';

export class DashboardDeposits extends React.Component {
    render() {
        return (                
            <div className={styles.container}>
                <div className={styles.header}>Счета</div>

                {
                    this.props.accounts.map((item, i) => {
                        return (<div key={item.id} className={styles.item}>{item.name} {item.amount.toFixed(2)} {item.currency}</div>); 
                    })
                }
            </div>
        )
    }
}