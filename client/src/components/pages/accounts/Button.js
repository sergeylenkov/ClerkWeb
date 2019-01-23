import React from 'react';
import { Icon } from '../../Icon.js';

export class AccountButton extends React.Component {
    render() {
        let className = 'account-button';

        if (this.props.isActive) {
            className += ' account-button-active';
        }

        return (
            <button className={className} onClick={() => this.props.onClick()}>
                <div className="account-button-icon"><Icon svg={this.props.icon}/></div>
                <div className="account-button-label">{this.props.title}</div>
            </button>
        );        
    }
}