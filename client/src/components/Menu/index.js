import React from 'react';
import { withRouter } from 'react-router-dom'
import { MenuButton } from './Button';

import styles from './index.module.css';

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

class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [
                { title: 'Dashboard', type: MenuTypes.Dashboard, path: '/' },
                { title: 'Transactions', type: MenuTypes.Transactions, path: '/transactions' },
                { title: 'Budgets', type: MenuTypes.Budgets, path: '/budgets' },
                { title: 'Goals', type: MenuTypes.Goals, path: '/goals' },
                { title: 'Schedulers', type: MenuTypes.Schedulers, path: 'schedulers' },
                { title: 'Reports', type: MenuTypes.Reports, path: '/reports' }
            ]
        };

        this.onMenuSelect = this.onMenuSelect.bind(this);
    }

    onMenuSelect(path) {
        this.props.history.push(path);
    }

    render() {
        const { pathname } = this.props.location;

        return (
            <div className={styles.container}>
            {
                this.state.items.map((item, i) => {
                    const selected = pathname.split('/')[1] === item.path.split('/')[1];

                    return (
                        <MenuButton
                            key={i}
                            value={item.path}
                            title={item.title}
                            isSelected={selected}
                            onClick={this.onMenuSelect}
                        />
                    )
                })
            }
            </div>
        );
    }
}

export default withRouter(Menu)