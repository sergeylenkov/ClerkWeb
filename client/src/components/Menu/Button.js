import React from 'react';
import { Icon } from '../Icon';

import styles from './Button.module.css';

export class MenuButton extends React.Component {
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
            <button className={`${styles.container} ${this.props.isSelected ? styles.selected : ''} ${this.state.isExpanded ? styles.expanded : ''} ${this.props.isExpandable ? styles.expandable : ''}`} onClick={this.onClick}>
                <div className={styles.expandButton}  onClick={this.onExpand}><div className={styles.arrow}></div></div>
                <div className={styles.icon}><Icon svg={this.props.icon}/></div>                
                <div className={styles.label}>{this.props.title}</div>
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
        this.props.onClick(this.props.value);
    }
}