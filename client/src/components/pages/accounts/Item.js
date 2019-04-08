import React from 'react';
import { Icon } from '../../Icon.js';

import styles from './Item.module.css';

export class AccountsListItem extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.icon}><Icon svg={this.props.icon}/></div>
                <div className={styles.label}>{this.props.title}</div>
            </div>
        )
    }
}