import React from 'react';
import moment from 'moment';
import { formatAmount } from '../../Utils.js';

import styles from './Schedulers.module.css';

export class DashboardSchedulers extends React.Component {
    render() {
        const from = moment();
        const days = [];
        const daysSum = {};
        let max = 0;

        for (let i = 0; i <= 30; i++) {            
            days.push(from.clone().add(i, 'd'));
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
                            
                            if (day.day() === 6 || day.day() === 0) {
                                weekDay = true;
                            }

                            let progress = null;

                            if (daysSum[day.format('YYYY-MM-DD')]) {
                                let height = daysSum[day.format('YYYY-MM-DD')] * stepY;

                                if (height < 10) {
                                    height = 10;
                                }

                                progress = <div className={styles.fill} style={{ height: `${height}px` }}></div>
                            }
                            
                            return (<div key={i} className={styles.item}>
                                        <div className={styles.progress}>{progress}</div>
                                        <div className={styles.line}></div>
                                        <div className={styles.dayTick}></div>
                                        <div className={`${styles.day} ${weekDay ? styles.weekDay : ''}`}>{day.date()}</div>
                                    </div>)
                        })
                    }                    
                </div>
                <div className={styles.list}>
                {
                    this.props.schedulers.map(item => {
                        const date = moment(item.date);
                        let formattedDate = date.format('MMM D');

                        return (<div key={item.id} className={styles.listItem}>
                            <div className={styles.itemDate}>{formattedDate}</div>
                            <div className={styles.itemName}>{item.name}</div>
                            <div className={styles.itemAmount}>{formatAmount(item.toAmount)}</div>
                        </div>)
                    })
                }
                </div>
            </div>
        )
    }
}