import React from 'react';
import { DataHelper, AccountTypes } from '../../../data/Data.js';
import styles from './Accounts.module.css';

export class TransactionsAccounts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expenses: [],
            deposits: [],
            receipts: [],
            debts: [],
            virtual: []
        }
    }

    componentDidMount() {
        const data = new DataHelper();

        data.accounts().then((items => {
            const expenses = items.filter(el => el.type === AccountTypes.Expenses);
            const receipts = items.filter(el => el.type === AccountTypes.Receipts);
            const deposits = items.filter(el => el.type === AccountTypes.Deposits);
            const debts = items.filter(el => el.type === AccountTypes.Debts);
            const virtual = items.filter(el => el.type === AccountTypes.Virtual);

            this.setState({
                expenses: expenses,
                receipts: receipts,
                deposits: deposits,
                debts: debts,
                virtual: virtual
            });
        }));
    }

    render() {
        return (
            <div className={styles.container}>
            <div className={styles.header}><div className={styles.headerLabel}>{'Receipts'}</div></div>
            {
                this.state.receipts.map(item => {
                    return <div key={item.id} className={styles.item}><div className={styles.label}>{item.name}</div></div>
                })
            }
            <div className={styles.header}><div className={styles.headerLabel}>{'Deposits'}</div></div>
            {
                this.state.deposits.map(item => {
                    return <div key={item.id} className={styles.item}><div className={styles.label}>{item.name}</div></div>
                })
            }
            <div className={styles.header}><div className={styles.headerLabel}>{'Virtual'}</div></div>
            {
                this.state.virtual.map(item => {
                    return <div key={item.id} className={styles.item}><div className={styles.label}>{item.name}</div></div>
                })
            }
            <div className={styles.header}><div className={styles.headerLabel}>{'Expenses'}</div></div>
            {
                this.state.expenses.map(item => {
                    return <div key={item.id} className={styles.item}><div className={styles.label}>{item.name}</div></div>
                })
            }
            <div className={styles.header}><div className={styles.headerLabel}>{'Debts'}</div></div>
            {
                this.state.debts.map(item => {
                    return <div key={item.id} className={styles.item}><div className={styles.label}>{item.name}</div></div>
                })
            }
            </div>
        )
    }
}