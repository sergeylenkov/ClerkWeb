import React from 'react';
import { DashboardPage } from './Dashboard.js';
import { AccountsPage } from './Accounts.js';

import styles from './Pages.module.css';

export class Pages extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activePage: 0
        }
    }

    render() {
        let page;

        switch (this.props.activePage) {
            case 0:
                page = <DashboardPage />
                break;

            case 1:
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