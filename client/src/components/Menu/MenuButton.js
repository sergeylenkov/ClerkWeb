import React from 'react';
import { Icon } from '../Icon.js';

export class MenuButton extends React.Component {
    render() {
        let className = 'menu-button';

        if (this.props.isActive) {
            className += ' menu-button-active';
        }

        return (
            <button className={className} onClick={() => this.props.onClick()}>
                <div className="menu-button-icon"><Icon svg={this.props.icon}/></div>
                <div className="menu-button-label">{this.props.title}</div>
            </button>
        );        
    }
}