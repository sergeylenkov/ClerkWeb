import React from 'react';
import { TransactionsList } from './transactions/List.js';
import { TransactionsFilter } from './transactions/Filter.js';

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