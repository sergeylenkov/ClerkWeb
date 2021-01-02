import React, { Component } from 'react';
import moment from 'moment';
import { data } from 'data';
import TransactionsList from './List';

import styles from './index.module.css';

interface TransactionsProps {};
interface TransactionsState {
  transactions: any[];
}

class Transactions extends Component<TransactionsProps, TransactionsState> {
  constructor(props: TransactionsProps) {
    super(props);

    this.state = {
      transactions: [],
    };
  }

  componentDidMount() {
    const from = moment().startOf("month");
    const to = moment().endOf("month");

    data.transactions.getAll(from, to).then((items) => {
      console.log(items);
      this.setState({
        transactions: items,
      });
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <TransactionsList transactions={this.state.transactions} />
      </div>
    );
  }
}

export default Transactions;