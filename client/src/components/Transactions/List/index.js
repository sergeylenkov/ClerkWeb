import React from 'react';
import TransactionsListItem from './Item';

import styles from './index.module.css';

export default class TransactionsList extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                {
                    this.props.transactions.map((item, i) => {
                        return (<TransactionsListItem key={item.id} item={item} />);
                    })
                }
            </div>
        );
    }
}