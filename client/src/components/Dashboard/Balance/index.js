import React from 'react';
import { formatAmount } from 'components/Utils';
import { withTranslation } from 'react-i18next';

import styles from './index.module.css';

class DashboardBalance extends React.Component {
    render() {
        const { t } = this.props;

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

export default withTranslation()(DashboardBalance);