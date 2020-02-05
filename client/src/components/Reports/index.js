import React from 'react';
import ExpensesReport from './Expenses';

import styles from './index.module.css';

export default class Dashboard extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <ExpensesReport />
            </div>
        )
    }
}