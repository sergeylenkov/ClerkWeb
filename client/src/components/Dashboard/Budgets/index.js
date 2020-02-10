import React from 'react';
import moment from 'moment';
import ProgressTable from '../Progress';

import styles from './index.module.css';

export class DashboardBudgets extends React.Component {
    constructor(props) {
        super(props);

        this.colors = [
            { from: 0, to: 49, color: '#6bcc83' },
            { from: 50, to: 89, color: '#fbaf43' },
            { from: 90, to: 100, color: '#e24a0e' }
        ]

        this.dayElement = null;
        this.progressRect = null;

        this.onCalculateProgress = this.onCalculateProgress.bind(this);
    }

    onCalculateProgress(rect) {
        this.progressRect = rect;
        this.renderDay();
    }

    renderDay() {
        if (this.dayElement && this.progressRect) {
            const daysInMonth = moment().endOf('month').date();
            const today = moment().date();
            const dayPercent = (today / daysInMonth) * 100;

            const left = this.progressRect.width * (dayPercent / 100);

            this.dayElement.style.left = `${this.progressRect.left + left}px`;
        }
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.header}>Budgets <span className={styles.month}>{moment().format('MMMM')}</span></div>
                <ProgressTable items={this.props.budgets} amountTitle={'Budget'} remainTitle={'Remain'} colors={this.colors} onCalculateProgress={this.onCalculateProgress} >
                    <div className={styles.dayContainer} ref={element => {
                        if (element) {
                            this.dayElement = element;
                            this.renderDay();
                        }
                    }}>
                        <div className={styles.dayLine}></div>
                        <div className={styles.day}>{moment().format('MMM D')}</div>
                    </div>
                </ProgressTable>
            </div>
        )
    }
}