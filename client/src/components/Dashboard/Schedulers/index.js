import React from 'react';
import moment from 'moment';
import { formatAmount, isSameDate } from '../../Utils';

import styles from './index.module.css';

export class DashboardSchedulers extends React.Component {
    render() {
        const from = moment();
        const days = [];
        const daysSum = {};
        const months = {};
        let max = 0;

        for (let i = 0; i <= 30; i++) {
            const day = from.clone().add(i, 'd');
            days.push(day);
        }

        this.props.schedulers.forEach(item => {
            if (daysSum[item.date]) {
                daysSum[item.date] = daysSum[item.date] + item.toAmount;
            } else {
                daysSum[item.date] = item.toAmount;
            }

            if (daysSum[item.date] > max) {
                max = daysSum[item.date];
            }
        });

        const stepY = 50 / max;

        return (
            <div className={styles.container}>
                <div className={styles.header}>Schedulers</div>
                <div className={styles.calendar}>
                    {
                        days.map((day, i) => {
                            let weekDay = false;
                            let today = false;

                            if (day.day() === 6 || day.day() === 0) {
                                weekDay = true;
                            }

                            if (isSameDate(day, moment())) {
                                today = true;
                            }

                            let progress = null;

                            if (daysSum[day.format('YYYY-MM-DD')]) {
                                let height = daysSum[day.format('YYYY-MM-DD')] * stepY;

                                if (height < 10) {
                                    height = 10;
                                }

                                progress = <div className={styles.fill} style={{ height: `${height}px` }}></div>
                            }

                            let month = null;

                            if (!months[day.format('YYYY-MM')]) {
                                months[day.format('YYYY-MM')] = true;

                                month = <div className={styles.month}>{day.format('MMM')}</div>
                            }

                            return (<div key={i} className={styles.item}>
                                        <div className={styles.progress}>{progress}</div>
                                        <div className={styles.line}></div>
                                        <div className={styles.tick}></div>
                                        <div className={`${styles.day} ${weekDay ? styles.weekDay : ''} ${today ? styles.today : ''}`}>{day.date()}</div>
                                        {month}
                                    </div>)
                        })
                    }
                </div>
                <div className={styles.table}>
                {
                    this.props.schedulers.map(item => {
                        const date = moment(item.date, 'YYYY-MM-DD');
                        let formattedDate = date.format('ddd, MMM D');

                        return (<div key={item.id} className={styles.row}>
                            <div className={styles.cell}><div className={styles.itemDate}>{formattedDate}</div></div>
                            <div className={`${styles.cell} ${styles.name}`}><div className={styles.itemName}>{item.name}</div></div>
                            <div className={styles.cell}><div className={styles.itemAmount}>{formatAmount(item.toAmount)}</div></div>
                        </div>)
                    })
                }
                </div>
            </div>
        )
    }
}