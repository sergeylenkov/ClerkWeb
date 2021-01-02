import React, { Component } from 'react';
import moment from 'moment';
import { WithTranslation, withTranslation } from 'react-i18next';
import { data } from 'data';
import TransactionItem from './Item';

import styles from './index.module.css';

interface DashboardTransactionsProps extends WithTranslation {};
interface DashboardTransactionsState {
  transactions: any[]
}

class DashboardTransactions extends Component<DashboardTransactionsProps, DashboardTransactionsState> {
  constructor(props: DashboardTransactionsProps) {
    super(props);

    this.state = {
      transactions: []
    }
  }

  componentDidMount() {
    const from = moment().startOf('month');
    const to = moment().endOf('month');

    data.transactions.getAll(from, to).then((transactions) => {
      this.setState({
        transactions: transactions
      })
    })
  }

  render() {
    const { t } = this.props;
    const { transactions } = this.state;

    return (
      <div className={styles.container}>
        <h3>{t('dashboard.lastTransactions')}</h3>
        {
          transactions.map((transaction, index) => {
            return <TransactionItem key={index} transaction={transaction} />
          })
        }
      </div>
    )
  }
}

export default withTranslation()(DashboardTransactions);