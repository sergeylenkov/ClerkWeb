import React from 'react';
import { DataHelper, AccountTypes } from '../../../data/Data.js';
import { getAccountIcon } from '../../Icon.js';
import { AccountsListItem } from './Item.js';

import styles from './List.module.css';

export class AccountsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expenses: [],
            deposits: [],
            receipts: [],
            credits: [],
            virtual: []
        }
        
        this.onAccountsSelect = this.onAccountsSelect.bind(this);
        this.onAccountSelect = this.onAccountSelect.bind(this);
    }

    componentDidMount() {
        const data = new DataHelper();

        data.accounts().then((items => {
            const expenses = items.filter(el => el.type === AccountTypes.Expenses);
            const receipts = items.filter(el => el.type === AccountTypes.Receipts);
            const deposits = items.filter(el => el.type === AccountTypes.Deposits);
            const credits = items.filter(el => el.type === AccountTypes.Credits);
            const virtual = items.filter(el => el.type === AccountTypes.Virtual);

            this.setState({
                expenses: expenses,
                receipts: receipts,
                deposits: deposits,
                credits: credits,
                virtual: virtual
            });
        }));
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.group}>{'Receipts'}</div>

                {
                    this.state.receipts.map((item, i) => {
                        return (<AccountsListItem key={item.id} value={item.id} icon={getAccountIcon(item.icon)} title={item.name} onClick={this.onAccountSelect} />)
                    })
                }

                <div className={styles.group}>{'Deposits'}</div>

                {
                    this.state.deposits.map((item, i) => {
                        return (<AccountsListItem key={item.id} value={item.id} icon={getAccountIcon(item.icon)} title={item.name} onClick={this.onAccountSelect} />)
                    })
                }

                <div className={styles.group}>{'Expenses'}</div>

                {
                    this.state.expenses.map((item, i) => {
                        return (<AccountsListItem key={item.id} value={item.id} icon={getAccountIcon(item.icon)} title={item.name} onClick={this.onAccountSelect} />)
                    })
                }                
            </div>
        );        
    }

    onAccountsSelect(type) {
        this.props.onAccountsSelect(type);
    }

    onAccountSelect(id) {
        this.props.onAccountSelect(id);
    }
}