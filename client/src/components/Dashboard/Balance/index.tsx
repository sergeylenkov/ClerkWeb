import React, { Component } from "react";
import { WithTranslation, withTranslation } from 'react-i18next';
import FormattedAmount from 'components/FormattedAmount';

import styles from "./index.module.css";

interface DashboardBalanceProps extends WithTranslation {
  total: any;
  own: any[];
  credits: any[];
}

class DashboardBalance extends Component<DashboardBalanceProps> {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>Total</div>
        <div className={styles.total}>
          <FormattedAmount amount={this.props.total.amount} currency={this.props.total.currency} withFraction />
        </div>
        <div className={styles.content}>
          <div className={styles.group}>
            <div className={styles.subheader}>Own funds</div>
            {this.props.own.map((item, i) => {
              return (
                <div key={item.currency} className={styles.item}>
                  <FormattedAmount amount={item.amount} currency={item.currency} withFraction />
                </div>
              );
            })}
          </div>

          <div className={styles.group}>
            <div className={styles.subheader}>Credit funds</div>
            {this.props.credits.map((item, i) => {
              let amount = item.credit;

              if (item.amount < 0) {
                amount = item.credit + item.amount;
              }

              return (
                <div key={item.currency} className={styles.item}>
                  <FormattedAmount amount={amount} currency={item.currency} withFraction />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(DashboardBalance);
