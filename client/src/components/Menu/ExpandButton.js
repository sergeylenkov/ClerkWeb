import React from 'react';
import { Icon } from '../Icon';

import baseStyles from './Button.module.css';
import styles from './ExpandButton.module.css';

export class MenuExpandButton extends React.Component {
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
            <button className={`${baseStyles.container} ${this.props.isSelected ? baseStyles.selected : ''} ${this.state.isExpanded ? styles.expanded : ''}`} onClick={this.onClick}>
                <div className={styles.expandButton} onClick={this.onExpand}><div className={styles.arrow}></div></div>
                <div className={styles.icon}><Icon svg={this.props.icon}/></div>                
                <div className={baseStyles.label}>{this.props.title}</div>
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