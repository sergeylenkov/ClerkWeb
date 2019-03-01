import React from 'react';

import styles from './Button.module.css';

export class AccountButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isSelected: false
        }
    }

    render() {
        let className = styles.container;

        if (this.state.isSelected) {
            className += ` ${styles.selected}`;
        }

        return (
            <button className={className} onClick={() => this.onClick()}>                
                <div className={styles.label}>{this.props.account.name}</div>
            </button>
        );        
    }

    onClick() {
        const selected = !this.state.isSelected;

        this.setState({
            isSelected: selected
        });
        console.log(selected);
        this.props.onClick(this.props.account.id);
    }
}