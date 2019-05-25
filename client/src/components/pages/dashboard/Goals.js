import React from 'react';
import { ProgressTable } from './progress/ProgressTable.js';

import styles from './Goals.module.css';

export class DashboardGoals extends React.Component {
    render() {
        return (                
            <div className={styles.container}>
                <div className={styles.header}>Goals</div>
                <ProgressTable items={this.props.goals} amountTitle={'Goal'} remainTitle={'Remain'} />
            </div>
        )
    }
}