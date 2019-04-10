import React from 'react';
import { Icon, getAccountIcon } from '../../Icon.js';

import styles from './Item.module.css';

export class TransactionAccountsListItem extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);        
    }

    render() {
        return (                
            <button className={styles.container} onClick={this.onClick}>                
                <div className={styles.icon}><Icon svg={getAccountIcon(this.props.item.icon)}/></div>
                <div className={styles.name}>{this.props.item.name}</div>                              
            </button>
        );
    }

    onClick() {
        this.props.onClick(this.props.item)
    }
}