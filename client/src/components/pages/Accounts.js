import React from 'react';
import { AccountsList } from './accounts/List.js';
import { TransactionsList } from './transactions/List.js';

import styles from './Accounts.module.css';

export class Accounts extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.accounts}><AccountsList/></div>
                <div className={styles.transactions}><TransactionsList/></div>
            </div>
        )
    }
}