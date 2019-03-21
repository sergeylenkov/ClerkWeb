import React from 'react';
import { Icon } from '../Icon';

import styles from './Button.module.css';

export class MenuButton extends React.Component {
    render() {
        let className = styles.container;

        if (this.props.isSelected) {
            className += ` ${styles.selected}`;
        }

        let expandButton = null;

        if (this.props.expandable) {
            expandButton = <button className={styles.expandButton} onClick={() => this.props.onExpand()}><div className={styles.arrow}></div></button>;
            className += ` ${styles.expandable}`;
        }

        return (
            <button className={className} onClick={() => this.props.onClick()}>
                {expandButton}
                <div className={styles.icon}><Icon svg={this.props.icon}/></div>                
                <div className={styles.label}>{this.props.title}</div>
            </button>
        );        
    }
}