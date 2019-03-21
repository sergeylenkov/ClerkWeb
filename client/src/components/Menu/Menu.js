import React from 'react';
import { MenuButton } from './Button.js';
import { MenuIcons } from './Icons.js';
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
    Trash: 7
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

        this.onAccountsSelect = this.onAccountsSelect.bind(this)
    }

    render() {
        return (
            <div className={styles.container}>
                {
                    this.state.items.map((item, i) => {
                        const selected = (item.type === this.state.selectedItem);

                        if (item.type === MenuTypes.Accounts) {
                            return (<MenuAccounts key={i} icon={item.icon} title={item.title} isSelected={selected} onAccountsSelect={this.onAccountsSelect} />)
                        } else {
                            return (<MenuButton key={i} icon={item.icon} title={item.title} isSelected={selected} onClick={() => this.handleClick(i)} />)
                        }
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

    onAccountsSelect() {
        this.setState({
            selectedItem: MenuTypes.Accounts
        });

        this.props.onChange(MenuTypes.Accounts)
    }
}