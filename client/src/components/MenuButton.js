import React from 'react';
import { Icon } from './Icon.js';

export class MenuButton extends React.Component {
    render() {
        return (
            <button className="menuButton">
                <div className="menuButtonIcon"><Icon name={this.props.icon}/></div>
                <div className="menuButtonLabel">{this.props.title}</div>
            </button>
        );        
    }
}