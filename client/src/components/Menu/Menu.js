import React from 'react';
import { MenuButton } from './MenuButton.js';
import { MenuIcons } from './MenuIcons.js';

export class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [
                { icon: MenuIcons.dashboard, title: 'Dashboard', selected: false },
                { icon: MenuIcons.accounts, title: 'Accounts', selected: false },
                { icon: MenuIcons.budgets, title: 'Budgets', selected: false },
                { icon: MenuIcons.goals, title: 'Goals', selected: false },
                { icon: MenuIcons.schedulers, title: 'Schedulers', selected: false },
                { icon: MenuIcons.reports, title: 'Reports', selected: false },
                { icon: MenuIcons.tags, title: 'Tags', selected: false },
                { icon: MenuIcons.trash, title: 'Trash', selected: false }
            ],
            activeItem: 0
        };
    }

    handleClick(i) {        
        this.setState({activeItem: i});
    }

    render() {
        return (
            <div className="menu">                
                {this.state.items.map((item, i) => {
                    const active = (i === this.state.activeItem);

                    return (<MenuButton key={i} icon={item.icon} title={item.title} isActive={active} onClick={() => this.handleClick(i)} />) 
                })}
            </div>
        );        
    }
}