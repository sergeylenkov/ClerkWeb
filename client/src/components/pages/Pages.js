import React from 'react';
import { Dashboard } from './Dashboard.js';
import { Accounts } from './Accounts.js';

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
                page = <Dashboard/>
                break;

            case 1:
                page = <Accounts/>
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