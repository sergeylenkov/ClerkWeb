import React from 'react';

import styles from './Button.module.css';

export class MenuButton extends React.Component {
    constructor(props) {
        super(props);

        this.onClick= this.onClick.bind(this);
    }

    render() {
        return (
            <button className={`${styles.container} ${this.props.isSelected ? styles.selected : ''}`} onClick={this.onClick}>
                
                <div className={styles.label}>{this.props.title}</div>
            </button>
        );
    }

    onClick() {
        this.props.onClick(this.props.value);
    }
}