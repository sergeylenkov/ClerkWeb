import React from 'react';
import { TransactionsList } from './transactions/List.js';

import styles from './Accounts.module.css';

export class AccountsPage extends React.Component {
    render() {
        return (
            <div className={styles.container}>                
                <TransactionsList/>
            </div>
        )
    }
}