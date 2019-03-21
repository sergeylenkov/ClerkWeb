import React from 'react';
import { formatAmount } from '../../Utils.js';

import styles from './Item.module.css';

export class TransactionsListItem extends React.Component {
    render() {
        return (                
            <div className={styles.container}>                    
                <div className={styles.fromName}>{this.props.item.fromName}</div>
                <div className={styles.toName}>{this.props.item.toName}</div>
                <div className={styles.amount}>{formatAmount(this.props.item.fromAmount, '')}</div>
            </div>
        );
    }
}