import React from 'react';
import { formatAmount } from '../../../Utils.js';

import styles from './ProgressTable.module.css';

export class ProgressTable extends React.Component {
    constructor(props) {
        super(props);

        this.tableElement = null;
        this.headerElement = null;

        this.defaultColors = [
            { from: 0, to: 79, color: '#6bcc83'},
            { from: 80, to: 100, color: '#e24a0e' }
        ]

        this.refTableCallback = element => {
            this.tableElement = element;
        }

        this.refHeaderCallback = element => {
            this.headerElement = element;
        };
    }

    getColorForProgress(percent) {
        let colors = this.defaultColors;
        let color = '';

        if (this.props.colors) {
            colors = this.props.colors;
        }

        colors.forEach(el => {
            if (percent >= el.from && percent <= el.to) {
                color = el.color;
            }
        });

        return color;
    }

    render() {
        return (
            <div className={styles.table} ref={this.refTableCallback}>
                <div className={`${styles.row} ${styles.header}`}>
                    <div className={styles.cell}></div>
                    <div className={styles.cell}>
                        <div className={styles.progressHeader} ref={this.refHeaderCallback}><div className={styles.progressHeader0}>0%</div><div className={styles.progressHeader100}>100%</div></div>                        
                    </div>
                    <div className={styles.cell}><div className={styles.amountHeader}>{this.props.amountTitle}</div></div>
                    <div className={styles.cell}><div className={styles.remainHeader}>{this.props.remainTitle}</div></div>
                </div>
                {
                   
                    this.props.items.map((item, i) => {
                        const total = item.amount;
                        const current = item.balance;
                        const remain = total - current;
                        let percent = current / (total / 100);

                        if (percent > 100) {
                            percent = 100;
                        }

                        const progressStyle = {
                            width: `${percent}%`,
                            background: this.getColorForProgress(percent)
                        }

                        const colorStyle = {
                            color: this.getColorForProgress(percent)
                        }
                        
                        return (
                            <div key={item.id} className={styles.row}>
                                <div className={styles.cell}><div className={styles.name}>{item.name}</div></div>
                                <div className={styles.cellProgress}>
                                    <div className={styles.progress}>
                                        <div className={styles.fill} style={progressStyle}></div>
                                        <div className={styles.current} ref={element => {                                            
                                            if (element) {
                                                this.calculateLabelPosition(element, percent);
                                            }
                                        }}>{formatAmount(current, '', false)}</div>
                                    </div>
                                </div>
                                <div className={styles.cell}><div className={styles.amount}>{formatAmount(total, '', false)}</div></div>
                                <div className={styles.cell}><div className={styles.remain} style={colorStyle}>{formatAmount(remain, '', false)}</div></div>
                            </div>
                        ); 
                    })                    
                }
                {this.props.children}
            </div>
        )
    }

    calculateLabelPosition(element, percent) {
        let headerWidth = 0;
        let headerRect = null;

        if (this.headerElement && this.tableElement) {            
            headerRect = this.headerElement.getBoundingClientRect();
            headerWidth = headerRect.width;      
        }

        const rect = element.getBoundingClientRect();

        let offset = headerWidth * (percent / 100);
        offset = offset - (rect.width / 2);

        if (offset < 0) {
            offset = 0;
        } else if (offset + rect.width > headerWidth) {
            offset = headerWidth - rect.width;
        }

        element.style.left = `${offset}px`;

        if (this.props.onCalculateProgress) {
            const tableRect = this.tableElement.getBoundingClientRect();
            const offset = headerRect.left - tableRect.left;
            
            this.props.onCalculateProgress({ left: offset, width: headerWidth });
        }
    }
}