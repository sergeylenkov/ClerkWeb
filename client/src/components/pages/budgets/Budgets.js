import React from 'react';
import { BudgetsList } from './List.js';

import styles from './Budgets.module.css';

export class BudgetsPage extends React.Component {
    render() {
        return (
            <div className={styles.container}>                
                <BudgetsList />
            </div>
        )
    }
}