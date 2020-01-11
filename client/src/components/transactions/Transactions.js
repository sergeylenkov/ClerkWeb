import React from 'react';
import moment from 'moment';
import Data from '../../data/Data.js';
import TransactionsList from './List.js';

import styles from './Transactions.module.css';

export default class Transactions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            transactions: []
        }

        this.data = new Data();
    }

    componentDidMount() {
        let from = moment().startOf('month');
        let to = moment().endOf('month');

        this.data.transactions.getAll(from, to).then(items => {
            console.log(items);
            this.setState({
                transactions: items
            })
        });
    }

    render() {
        return (
            <div className={styles.container}>
                <TransactionsList transactions={this.state.transactions} />
            </div>
        )
    }
}