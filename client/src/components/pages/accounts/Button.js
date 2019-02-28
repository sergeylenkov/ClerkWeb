import React from 'react';

import styles from './Button.module.css';

export class AccountButton extends React.Component {
    render() {
        let className = styles.container;

        if (this.props.isSelected) {
            className += ` ${styles.selected}`;
        }

        return (
            <button className={className} onClick={() => this.props.onClick()}>                
                <div className={styles.label}>{this.props.title}</div>
            </button>
        );        
    }
}