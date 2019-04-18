import React from 'react';
import { GoalsList } from './List.js';

import styles from './Goals.module.css';

export class GoalsPage extends React.Component {
    render() {
        return (
            <div className={styles.container}>                
                <GoalsList />
            </div>
        )
    }
}