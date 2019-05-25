import React from 'react';
import { ProgressTable } from './progress/ProgressTable.js';

import styles from './Debts.module.css';

export class DashboardDebts extends React.Component {
    constructor(props) {
        super(props);

        this.tableElement = null;
        this.headerElement = null;
        this.currentElements = {};

        this.refTableCallback = element => {
            this.tableElement = element;
        }

        this.refHeaderCallback = element => {
            this.headerElement = element;
        };
    }

    render() {
        return (                
            <div className={styles.container}>
                <div className={styles.header}>Debts</div>
                <ProgressTable items={this.props.debts} amountTitle={'Debt'} remainTitle={'Remain'} />
            </div>
        )
    }
}