import React from 'react';
import moment from 'moment';
import { formatAmount } from '../../Utils.js';

import styles from './Budgets.module.css';

export class DashboardBudgets extends React.Component {
    constructor(props) {
        super(props);

        this.tableElement = null;
        this.headerElement = null;

        this.refTableCallback = element => {
            this.tableElement = element;
        }

        this.refHeaderCallback = element => {
            this.headerElement = element;
        };
    }

    render() {
        let from = moment().startOf('month');
        let to = moment().endOf('month');

        let daysInMonth = to.subtract(from).date();
        let today = moment().date();
        let progressOffset = 0;
        let dayLineOffset = 0;

        if (this.headerElement && this.tableElement) {
            const rect = this.tableElement.getBoundingClientRect();
            const headerRect = this.headerElement.getBoundingClientRect();
            
            const dayPercent = (today / daysInMonth) * 100;

            progressOffset = (headerRect.left - rect.left) + 10;
            dayLineOffset = headerRect.width * (dayPercent / 100);

            if (dayLineOffset > headerRect.width) {
                dayLineOffset = headerRect.width;
            }
        }

        const dayLineStyle = {
            left: `${progressOffset + dayLineOffset}px`
        }

        return (                
            <div className={styles.container}>
                <div className={styles.header}>Budgets <span className={styles.month}>{moment().format('MMMM')}</span></div>
                <div className={styles.table} ref={this.refTableCallback}>
                <div className={`${styles.row} ${styles.header}`}>
                    <div className={styles.cell}></div>
                    <div className={styles.cell}>
                        <div className={styles.progressHeader}  ref={this.refHeaderCallback}><div className={styles.progressHeader0}>0%</div><div className={styles.progressHeader100}>100%</div></div>                        
                    </div>
                    <div className={styles.cell}><div className={styles.amountHeader}>{'Budget'}</div></div>
                    <div className={styles.cell}><div className={styles.amountHeader}>{'Remain'}</div></div>
                </div>
                <div className={styles.dayLine} style={dayLineStyle}></div>
                <div className={styles.day} style={dayLineStyle}>{moment().format('MMM D')}</div>
                {
                   
                    this.props.budgets.map((item, i) => {
                        const total = item.amount;
                        const current = item.balance;
                        const remain = total - current;
                        let percent = current / (total / 100);

                        if (percent > 100) {
                            percent = 100;
                        }

                        const progressStyle = {
                            width: `${percent}%`
                        }

                        let currentStyle = {}

                        if (percent < 85) {
                            currentStyle = {
                                left: `${percent}%`
                            }
                        } else {
                            currentStyle = {
                                right: '0',
                                transform: 'none'
                            }
                        }
                        
                        let className = '';

                        if (percent > 50 && percent < 90) {
                            className += ` ${styles.half}`;
                        } else if (percent >= 90) {
                            className += ` ${styles.over}`;
                        }

                        return (
                            <div key={item.id} className={`${styles.row} ${className}`}>
                                <div className={styles.cell}><div className={styles.name}>{item.name}</div></div>
                                <div className={styles.cell}>
                                    <div className={styles.progress}><div className={styles.fill} style={progressStyle}></div><div className={styles.current} style={currentStyle}>{formatAmount(current, '', false)}</div></div>
                                </div>
                                <div className={styles.cell}><div className={styles.amount}>{formatAmount(total, '', false)}</div></div>
                                <div className={styles.cell}><div className={styles.remain}>{formatAmount(remain, '', false)}</div></div>
                            </div>
                        ); 
                    })                    
                }
                </div>
            </div>
        )
    }
}