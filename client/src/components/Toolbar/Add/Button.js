import React from 'react';
import { Icon, Icons } from '../../Icon.js';

import styles from './Button.module.css';

export class ToolbarAddButton extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isExpanded: false
        }

        this.onExpand = this.onExpand.bind(this);
        this.onClick= this.onClick.bind(this);
    }

    render() {
        return (
            <button className={styles.container} onClick={this.onClick}>                
                <div className={styles.icon}><Icon svg={Icons.plus}/></div>
                <div className={styles.label}>Add Transaction</div>
                <div className={styles.expandButton} onClick={this.onExpand}>
                    <div className={styles.arrow}></div>
                </div>
            </button>
        );
    }

    onExpand(e) {
        e.stopPropagation();
        
        const expanded = !this.state.isExpanded;

        this.setState({
            isExpanded: expanded
        });

        this.props.onExpand(expanded);
    }

    onClick() {
        this.props.onClick();
    }
}