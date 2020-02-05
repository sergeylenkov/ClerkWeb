import React from 'react';

import styles from './index.module.css';

export class MenuButton extends React.Component {
    constructor(props) {
        super(props);

        this.onClick= this.onClick.bind(this);
    }

    onClick() {
        this.props.onClick(this.props.value);
    }

    render() {
        return (
            <button className={`${styles.container} ${this.props.isSelected ? styles.selected : ''}`} onClick={this.onClick}>

                <div className={styles.label}>{this.props.title}</div>
            </button>
        );
    }
}