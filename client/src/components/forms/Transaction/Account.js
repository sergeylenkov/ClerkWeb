import React from 'react';
import { Icon, Icons } from '../../Icon.js';

import styles from './Account.module.css';

export class TransactionAccountField extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isExpanded: false
        }

        this.onExpand = this.onExpand.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.placeholder}>
                    <div className={styles.title}>{this.props.title}</div>
                    <div className={styles.name}>{this.props.account.name}</div>
                </div>
                <div className={styles.expandButton} onClick={this.onExpand}>
                    <div className={styles.arrow}></div>
                </div>
            </div>
        );
    }

    onExpand(e) {
        e.stopPropagation();
        
        const expanded = !this.state.isExpanded;

        this.setState({
            isExpanded: expanded
        });
    }

    onSelect() {
        this.props.onSelect();
    }
}