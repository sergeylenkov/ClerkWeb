import React from 'react';
import { formatAmount } from '../../Utils';

import styles from './index.module.css';

export class DashboardBalance extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.header}>Total</div>
                <div className={styles.total}>{formatAmount(this.props.total.amount, this.props.total.currency)}</div>
                <div className={styles.content}>
                    <div className={styles.group}>
                    <div className={styles.subheader}>Own funds</div>
                    {
                        this.props.own.map((item, i) => {
                            return (<div key={item.currency} className={styles.item}>{formatAmount(item.amount, item.currency)}</div>);
                        })
                    }
                    </div>

                    <div className={styles.group}>
                    <div className={styles.subheader}>Credit funds</div>
                    {
                        this.props.credits.map((item, i) => {
                            let amount = item.credit;

                            if (item.amount < 0) {
                                amount = item.credit + item.amount;
                            }

                            return (<div key={item.currency} className={styles.item}>{formatAmount(amount, item.currency)}</div>);
                        })
                    }
                    </div>
                </div>
            </div>
        );
    }
}