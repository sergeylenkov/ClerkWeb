import React from 'react';
import { MenuButton } from './Button.js';
import { MenuIcons } from './Icons.js';

import styles from './Menu.module.css';

export class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [
                { icon: MenuIcons.dashboard, title: 'Dashboard', expandable: false },
                { icon: MenuIcons.accounts, title: 'Accounts', expandable: true },
                { icon: MenuIcons.budgets, title: 'Budgets', expandable: false },
                { icon: MenuIcons.goals, title: 'Goals', expandable: false },
                { icon: MenuIcons.schedulers, title: 'Schedulers', expandable: false },
                { icon: MenuIcons.reports, title: 'Reports', expandable: false },
                { icon: MenuIcons.tags, title: 'Tags', expandable: false },
                { icon: MenuIcons.trash, title: 'Trash', expandable: false }       
            ],
            selectedItem: 0
        };
    }

    render() {
        return (
            <div className={styles.container}>
                {
                    this.state.items.map((item, i) => {
                        const selected = (i === this.state.selectedItem);
                        return (<MenuButton key={i} icon={item.icon} title={item.title} expandable={item.expandable} isSelected={selected} onClick={() => this.handleClick(i)} onExpand={() => this.handleExpand(i)} />) 
                    })
                }
            </div>
        );        
    }

    handleClick(i) {        
        this.setState({
            selectedItem: i
        });

        this.props.onChange(i);
    }

    handleExpand(i) {

    }
}