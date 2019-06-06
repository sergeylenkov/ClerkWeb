import React from 'react';
import { ProgressTable } from './progress/ProgressTable.js';

import styles from './Goals.module.css';

export class DashboardGoals extends React.Component {
    constructor(props) {
        super(props);

        this.colors = [
            { from: 0, to: 79, color: '#e24a0e'},
            { from: 80, to: 100, color: '#6bcc83' }
        ]
    }

    render() {
        return (                
            <div className={styles.container}>
                <div className={styles.header}>Goals</div>
                <ProgressTable items={this.props.goals} amountTitle={'Goal'} remainTitle={'Remain'} colors={this.colors} />
            </div>
        )
    }
}