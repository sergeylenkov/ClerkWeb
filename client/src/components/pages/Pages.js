import React from 'react';
import { MenuTypes } from '../menu/Menu.js';
import { DashboardPage } from './dashboard/Dashboard.js';
import { TransactionsPage } from './transactions/Transactions.js';
import { BudgetsPage } from './budgets/Budgets.js';
import { GoalsPage } from './goals/Goals.js';
import { SchedulersPage } from './schedulers/Schedulers.js';

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

            case MenuTypes.Budgets:
                page = <BudgetsPage />
                break;

            case MenuTypes.Goals:
                page = <GoalsPage />
                break;

            case MenuTypes.Schedulers:
                page = <SchedulersPage />
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