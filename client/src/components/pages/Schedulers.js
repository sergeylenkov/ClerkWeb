import React from 'react';
import { SchedulersList } from './schedulers/List.js';

import styles from './Schedulers.module.css';

export class SchedulersPage extends React.Component {
    render() {
        return (
            <div className={styles.container}>                
                <SchedulersList />
            </div>
        )
    }
}