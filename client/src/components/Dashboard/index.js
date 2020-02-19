import React from 'react';
import moment from 'moment';
import { withTranslation } from 'react-i18next';
import Data, { AccountTypes } from 'data/Data.js';
import { convertExchangeRates } from 'components/Utils';
import FormattedAmount from 'components/FormattedAmount';

import styles from './index.module.css';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ownFunds: [],
      creditFunds: [],
      accounts: [],
      expenses: [],
      budgets: [],
      goals: [],
      debts: [],
      schedulers: [],
      total: { amount: 0, currency: 'RUB' },
      totalExpenses: { amount: 0, currency: 'RUB' },
    }

    this.data = new Data();
  }

  componentDidMount() {
    this.data.exchange.getExchangeRates().then(() => {
      this.getBalance();
      this.getExpenses();
    });
  }

  getBalance() {
    this.data.dashboard.getBalance().then((items) => {
      let own = [];
      let credits = [];
      let currency = {};

      items.forEach(item => {
        if (item.amount > 0 && item.type !== AccountTypes.Virtual) {
          if (!currency[item.currency]) {
            currency[item.currency] = 0;
          }

          currency[item.currency] = currency[item.currency] + item.amount;
        }

        if (item.credit) {
          credits.push(item);
        }
      });

      const keys = Object.keys(currency);
      own = keys.map(key => {
        return { currency: key, amount: currency[key] };
      });

      const total = items.reduce((accumulator, item) => {
        return accumulator + convertExchangeRates(item.currency, 'RUB', item.amount);
      }, 0);

      this.setState({
        ownFunds: own,
        creditFunds: credits,
        accounts: items,
        total: { amount: total, currency: 'RUB' }
      });
    });
  }

  getExpenses() {
    const from = moment().startOf('month');
    const to = moment().endOf('month');

    this.data.dashboard.getExpenses(from, to).then((expenses) => {
      const total = expenses.reduce((accumulator, item) => {
          return accumulator + convertExchangeRates(item.currency, 'RUB', item.amount);
      }, 0);

      this.setState({
        expenses: expenses,
        totalExpenses: { amount: total, currency: 'RUB' }
      });
    });
  }

  render() {
    const { t } = this.props;
    const { total, totalExpenses } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.content}>
            <div className={styles.balance}>
              <div className={styles.balanceLabel}>{t('dashboard.Balance')}, {moment().format('d MMMM')}</div>
              <div className={styles.balanceAmount}><FormattedAmount amount={total.amount} currency={total.currency} /></div>
            </div>
            <div className={styles.receipts}>
              <div className={styles.receiptsLabel}>{t('dashboard.Receipts')}</div>
              <div className={styles.receiptsAmount}><FormattedAmount amount={0} currency={totalExpenses.currency} /></div>
            </div>
            <div className={styles.expenses}>
              <div className={styles.expensesLabel}>{t('dashboard.Expenses')}</div>
              <div className={styles.expensesAmount}><FormattedAmount amount={totalExpenses.amount} currency={totalExpenses.currency} /></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(Dashboard);