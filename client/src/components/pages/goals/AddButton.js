import React from 'react';
import { Icon, Icons } from '../../Icon.js';

import styles from './AddButton.module.css';

export class GoalsListAddButton extends React.Component {
    render() {
        return (                
            <button className={styles.container}>
                <div className={styles.icon}><Icon svg={Icons.plus}/></div>
                <div className={styles.label}>Add Goal</div>            
            </button>
        );
    }
}