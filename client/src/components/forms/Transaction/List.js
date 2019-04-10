import React from 'react';
import { TransactionAccountsListItem } from './Item.js';

import styles from './List.module.css';

export class TransactionAccountsList extends React.Component {
    constructor(props) {
        super(props);

        this.onSelect = this.onSelect.bind(this);
    }

    render() {
        return (
            <div className={styles.container}>
            {
                this.props.accounts.map((item, i) => {
                    return <TransactionAccountsListItem key={item.id} item={item} onClick={this.onSelect} />
                })
            }
            </div>
        );
    }

    onSelect(account) {
        this.props.onSelect(account)
    }
}