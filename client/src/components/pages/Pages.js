import React from 'react';
import { MenuTypes } from '../menu/Menu.js';
import { DashboardPage } from './Dashboard.js';
import { AccountsPage } from './Accounts.js';

import styles from './Pages.module.css';

export class Pages extends React.Component {
    render() {
        let page;

        switch (this.props.activePage) {
            case MenuTypes.Dashboard:
                page = <DashboardPage />
                break;

            case MenuTypes.Accounts:
                page = <AccountsPage />
                break;

            case MenuTypes.Receipts:
                page = <AccountsPage />
                break;

            case MenuTypes.Deposits:
                page = <AccountsPage />
                break;

            case MenuTypes.Expenses:
                page = <AccountsPage />
                break;

            case MenuTypes.Credits:
                page = <AccountsPage />
                break;

            case MenuTypes.Virtual:
                page = <AccountsPage />
                break;

            default:
                break;
        }

        return (
            <div className={styles.container}>
                {page}
            </div>
        );
    }
}