import React from 'react';
import { formatAmount } from '../../Utils.js';

import styles from './Budgets.module.css';

export class DashboardBudgets extends React.Component {
    render() {
        return (                
            <div className={styles.container}>
                <div className={styles.header}>Бюджет</div>

                {
                    this.props.budgets.map((item, i) => {
                        const total = item.amount;
                        const current = item.expense;
                        const remains = total - current;
                        let percent = current / (total / 100);

                        if (percent > 100) {
                            percent = 100;
                        }

                        const progressStyle = {
                            width: `${percent}%`                            
                        }

                        let className = styles.item;

                        if (percent > 50 && percent < 90) {
                            className += ` ${styles.half}`;
                        } else if (percent >= 90) {
                            className += ` ${styles.over}`;
                        }

                        return (
                            <div key={item.id} className={className}>
                                <div className={styles.left}>
                                    <div className={styles.top}>
                                        <div className={styles.name}>{item.name}</div>
                                        <div className={styles.current}>{formatAmount(current, '')}</div>
                                        <div className={styles.total}>{formatAmount(total, '')}</div>
                                    </div>
                                    <div className={styles.progress}><div className={styles.fill} style={progressStyle}></div></div>
                                </div>
                                <div className={styles.right}><div className={styles.remains}>{formatAmount(remains, item.currency)}</div></div>
                            </div>
                        ); 
                    })
                }
            </div>
        )
    }
}