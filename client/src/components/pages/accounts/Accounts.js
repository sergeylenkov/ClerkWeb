import React from 'react';
import { AccountsList } from './List.js';

import styles from './Accounts.module.css';

export class AccountsPage extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <AccountsList />                
            </div>
        )
    }
}