import React from 'react';
import { formatAmount } from '../../Utils.js';

import styles from './Balance.module.css';

export class DashboardBalance extends React.Component {    
    render() {
        return (                
            <div className={styles.container}>
                <div className={styles.header}>Own funds</div>

                {
                    this.props.own.map((item, i) => {
                        return (<div key={item.id} className={styles.item}>{formatAmount(item.amount, item.currency)}</div>); 
                    })
                }

                <div className={styles.subheader}>Credit funds</div>

                {
                    this.props.credits.map((item, i) => {
                        return (<div key={item.id} className={styles.item}>{formatAmount(item.credit + item.amount, item.currency)}</div>);
                    })
                }
            </div>
        );
    }
}