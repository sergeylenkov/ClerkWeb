import React from 'react';
import { MenuButton } from './Button.js';

import styles from './Menu.module.css';

export const MenuTypes = {
    Dashboard: 0,
    Accounts: 1,
    Budgets: 2,
    Goals: 3,
    Schedulers: 4,
    Reports: 5,
    Tags: 6,
    Transactions: 8    
}

export class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [
                { title: 'Dashboard', type: MenuTypes.Dashboard },
                { title: 'Transactions', type: MenuTypes.Transactions },
                { title: 'Budgets', type: MenuTypes.Budgets },
                { title: 'Goals', type: MenuTypes.Goals },
                { title: 'Schedulers', type: MenuTypes.Schedulers },
                { title: 'Reports', type: MenuTypes.Reports }
            ],
            selectedItem: MenuTypes.Dashboard
        };

        this.onMenuSelect = this.onMenuSelect.bind(this);
    }

    render() {
        return (
            <div className={styles.container}>
                {
                    this.state.items.map((item, i) => {
                        const selected = (item.type === this.state.selectedItem);
                        return (<MenuButton key={i} value={item.type} title={item.title} isSelected={selected} onClick={this.onMenuSelect} />)
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
}