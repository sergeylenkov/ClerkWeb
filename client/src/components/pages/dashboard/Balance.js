import React from 'react';

import styles from './Balance.module.css';

export class DashboardBalance extends React.Component {    
    render() {
        return (                
            <div className={styles.container}>
                <div className={styles.header}>Собственный средства</div>

                {
                    this.props.own.map((item, i) => {
                        return (<div key={item.id} className={styles.item}>{item.amount.toFixed(2)} {item.currency}</div>); 
                    })
                }

                <div className={styles.header}>Кредитные средства</div>

                {
                    this.props.credits.map((item, i) => {
                        return (<div key={item.id} className={styles.item}>{(item.credit + item.amount).toFixed(2)} {item.currency}</div>); 
                    })
                }
            </div>
        );
    }
}