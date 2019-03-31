import React from 'react';
import { MenuTypes } from '../menu/Menu.js';
import { DashboardPage } from './Dashboard.js';
import { AccountsPage } from './Accounts.js';
import { BudgetsPage } from './Budgets.js';
import { GoalsPage } from './Goals.js';
import { SchedulersPage } from './Schedulers.js';
import { TagsPage } from './Tags.js';

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

            case MenuTypes.Budgets:
                page = <BudgetsPage />
                break;

            case MenuTypes.Goals:
                page = <GoalsPage />
                break;

            case MenuTypes.Schedulers:
                page = <SchedulersPage />
                break;
            
            case MenuTypes.Tags:
                page = <TagsPage />
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