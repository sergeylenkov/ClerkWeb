import React from 'react';
import { TransactionsList } from './List.js';
import { TransactionsFilter } from './Filter.js';

import styles from './Transactions.module.css';

export class TransactionsPage extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <TransactionsFilter />
                <TransactionsList />
            </div>
        )
    }
}