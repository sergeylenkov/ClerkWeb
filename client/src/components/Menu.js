import React from 'react';
import { MenuButton } from './MenuButton.js';

export class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [
                { icon: 'test', title: 'Dashboard', selected: false },
                { icon: 'test', title: 'Accounts', selected: false },
                { icon: 'test', title: 'Budgets', selected: false },
                { icon: 'test', title: 'Goals', selected: false },
                { icon: 'test', title: 'Reports', selected: false },
                { icon: 'test', title: 'Trash', selected: false }
            ]
        };
    }

    render() {
        return (
            <div className="menu">                
                {this.state.items.map((item, i) => {
                    return (<MenuButton key={i} icon={item.icon} title={item.title} />) 
                })}
            </div>
        );        
    }
}