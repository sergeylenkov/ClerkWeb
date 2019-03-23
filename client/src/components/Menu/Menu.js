import React from 'react';
import { MenuButton } from './Button.js';
import { MenuIcons } from '../Icon.js';
import { MenuAccounts } from './Accounts.js';

import styles from './Menu.module.css';

export const MenuTypes = {
    Dashboard: 0,
    Accounts: 1,
    Budgets: 2,
    Goals: 3,
    Schedulers: 4,
    Reports: 5,
    Tags: 6,
    Trash: 7,
    Receipts: 8,
    Deposits: 9,
    Expenses: 10,
    Credits: 11,
    Virtual: 12
}

export class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [
                { title: 'Dashboard', icon: MenuIcons.dashboard, type: MenuTypes.Dashboard },
                { title: 'Accounts', icon: MenuIcons.accounts, type: MenuTypes.Accounts },
                { title: 'Budgets', icon: MenuIcons.budgets, type: MenuTypes.Budgets },
                { title: 'Goals', icon: MenuIcons.goals, type: MenuTypes.Goals },
                { title: 'Schedulers', icon: MenuIcons.schedulers, type: MenuTypes.Schedulers },
                { title: 'Reports', icon: MenuIcons.reports, type: MenuTypes.Reports },
                { title: 'Tags', icon: MenuIcons.tags, type: MenuTypes.Tags },
                { title: 'Trash', icon: MenuIcons.trash, type: MenuTypes.Trash } 
            ],
            selectedItem: MenuTypes.Dashboard
        };

        this.onMenuSelect = this.onMenuSelect.bind(this);
        this.onAccountsSelect = this.onAccountsSelect.bind(this);
        this.onAccountSelect = this.onAccountSelect.bind(this);
    }

    render() {
        return (
            <div className={styles.container}>
                {
                    this.state.items.map((item, i) => {
                        if (item.type === MenuTypes.Accounts) {
                            return (<MenuAccounts key={i} icon={item.icon} title={item.title} selection={this.state.selectedItem} onAccountsSelect={this.onAccountsSelect} onAccountSelect={this.onAccountSelect} />)
                        } else {
                            const selected = (item.type === this.state.selectedItem);
                            return (<MenuButton key={i} value={item.type} icon={item.icon} title={item.title} isSelected={selected} isExpandable={false} onClick={this.onMenuSelect} />)
                        }
                    })
                }
            </div>
        );        
    }

    onMenuSelect(type) {        
        this.setState({
            selectedItem: type
        });

        this.props.onChange(type);
    }

    onAccountsSelect(type) {
        console.log(type);
        this.setState({
            selectedItem: type
        });

        this.props.onChange(type)
    }

    onAccountSelect(id) {
        console.log(id);
    }
}