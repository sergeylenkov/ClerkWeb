import React from 'react';
import ProgressTable from 'components/Dashboard/Progress';

import styles from './index.module.css';

export class DashboardDebts extends React.Component {
    constructor(props) {
        super(props);

        this.tableElement = null;
        this.headerElement = null;
        this.currentElements = {};

        this.colors = [
            { from: 0, to: 79, color: '#e24a0e'},
            { from: 80, to: 100, color: '#6bcc83' }
        ]

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
                <ProgressTable items={this.props.debts} amountTitle={'Debt'} remainTitle={'Remain'} colors={this.colors} />
            </div>
        )
    }
}