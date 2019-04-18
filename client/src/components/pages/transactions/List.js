import React from 'react';
import { TransactionsListItem } from './Item.js';

import styles from './List.module.css';

export class TransactionsList extends React.Component {
    render() {
        return (                
            <div className={styles.container}>                    
                {
                    this.props.transactions.map((item, i) => {
                        return (<TransactionsListItem key={item.id} item={item} />); 
                    })
                }
            </div>
        );
    }
}