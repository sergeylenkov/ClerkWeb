import React from 'react';
import { DashboardBalance } from './dashboard/Balance';

import styles from './Dashboard.module.css';

export class Dashboard extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <DashboardBalance/>
            </div>
        );
    }
}