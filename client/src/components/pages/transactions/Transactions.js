import React from 'react';
import moment from 'moment';
import { DataHelper } from '../../../data/Data.js';
import { TransactionsList } from './List.js';
import { TransactionsFilter } from './Filter.js';
import { TransactionsAccounts } from './Accounts.js';

import styles from './Transactions.module.css';

export class TransactionsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            transactions: []
        }
    }

    componentDidMount() {
        const data = new DataHelper();

        const from = new moment().startOf('month');
        const to = new moment().endOf('month');

        data.transactions(from, to).then((items) => {
            this.setState({
                transactions: items
            });
        });
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.left}>
                    <TransactionsAccounts />
                </div>
                <div className={styles.right}>
                    <TransactionsFilter />
                    <TransactionsList transactions={this.state.transactions} />
                </div>
            </div>
        )
    }
}