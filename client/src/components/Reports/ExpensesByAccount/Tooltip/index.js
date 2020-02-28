import React from 'react';
import FormattedAmount from 'components/FormattedAmount';

import styles from './index.module.css';

export default class AccountTooltip extends React.Component {
  render() {
    const { active, payload } = this.props;

    if (active) {
      const { name, total } = payload[0].payload;
      return (
        <div className={styles.container}>
          <div className={styles.name}>{name}</div>
          <div className={styles.total}>
            <FormattedAmount amount={total} currency='RUB' />
          </div>
        </div>
      )
    }

    return null;
  }
}