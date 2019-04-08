import React from 'react';
import { MenuTypes } from '../menu/Menu.js';
import { DashboardPage } from './Dashboard.js';
import { TransactionsPage } from './Transactions.js';
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

            case MenuTypes.Transactions:
                page = <TransactionsPage />
                break;

            case MenuTypes.Accounts:
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