import React from 'react';
import moment from 'moment';
import { DataHelper, AccountTypes } from '../../../data/Data.js';
import { TransactionAccountField } from './Account.js';
import { TransactionAmountField } from './Amount.js';

import styles from './Transaction.module.css';

export class TransactionForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fromAccount: { id: -1, name: '' },
            toAccount: { id: -1, name: '' },
            fromAmount: 0,
            toAmount: 0,
            tags: []
        }

        this.onClose = this.onClose.bind(this)
        this.onFormClick = this.onFormClick.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.onSave = this.onSave.bind(this)
        this.onExpandFrom = this.onExpandFrom.bind(this)
    }

    componentDidMount() {
        const data = new DataHelper();

        data.accounts().then((items => {
            const expenses = items.filter(el => el.type === AccountTypes.Expenses);
            const receipts = items.filter(el => el.type === AccountTypes.Receipts);
            const deposits = items.filter(el => el.type === AccountTypes.Deposits);
            const credits = items.filter(el => el.type === AccountTypes.Credits);
            const virtual = items.filter(el => el.type === AccountTypes.Virtaul);

            this.setState({
                expenses: expenses,
                receipts: receipts,
                deposits: deposits,
                credits: credits,
                virtual: virtual,
                fromAccount: deposits[0],
                toAccount: expenses[0]
            });
        }));
    }

    render() {        
        return (                
            <div className={styles.overlay} onClick={this.onClose}>
                <div className={styles.container} onClick={this.onFormClick}>
                    <div className={styles.fields}>
                        <div className={styles.accounts}>
                            <div className={styles.fromAccount}>
                                <TransactionAccountField title={'From account'} account={this.state.fromAccount} listAccounts={this.state.receipts} />
                            </div>
                            <div className={styles.toAccount}>
                                <TransactionAccountField title={'To account'} account={this.state.toAccount} listAccounts={this.state.expenses} />
                            </div>
                        </div>

                        <div className={styles.amounts}>
                            <div className={styles.fromAmount}>
                                <TransactionAmountField title={'From Amount'} value={0} />
                            </div>
                            <div className={styles.amountDivider}>=</div>
                            <div className={styles.toAmount}>
                                <TransactionAmountField title={'To Amount'} value={0} />
                            </div>
                        </div>
                    </div>

                    <div className={styles.buttons}>
                        <button className={styles.cancelButton} onClick={this.onCancel}>Cancel</button>
                        <button className={styles.saveButton} onClick={this.onSave}>Save</button>
                    </div>
                </div>
            </div>
        )
    }

    onExpandFrom() {

    }

    onClose() {
        this.props.onClose();
    }

    onFormClick(e) {
        e.stopPropagation();
    }

    onCancel() {
        this.props.onClose();
    }

    onSave() {
        const data = new DataHelper();

        const transaction = {
            fromAccount: this.state.fromAccount.id,
            toAccount: this.state.toAccount.id,
            fromAmount: 0,
            toAmount: 0,
            tags: [],
            date: new moment().format("YYYY-MM-DD")
        }

        data.saveTransaction({ transaction }).then((result) => {
            console.log(result);
        });
    }
}