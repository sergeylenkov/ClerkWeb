import FormattedAmount from 'components/FormattedAmount';
import React from 'react';
import styles from './index.module.css';

class TransactionItem extends React.Component {
  render() {
    const { fromAmount, fromName } = this.props.transaction;

    return (
      <div className={styles.container}>
        <FormattedAmount amount={fromAmount} currency={'RUB'} /> &#8594; <span>{fromName}</span>
      </div>
    )
  }
}

export default TransactionItem;