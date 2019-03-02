import React from 'react';
import { DashboardBalance } from './dashboard/Balance';
import { DashboardDeposits } from './dashboard/Deposits.js';
import { DataHelper } from '../../data/Data.js';

import styles from './Dashboard.module.css';

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            own: [],
            credits: [],
            accounts: []
        }
    }

    componentDidMount() {
        const data = new DataHelper();

        data.balance().then((items) => {
            const own = items.filter(el => !el.credit);
            const credits = items.filter(el => el.credit);
    
            let group = [];
    
            own.reduce((res, value) => {
                if (!res[value.currency]) {
                    res[value.currency] = {
                        id: value.currency,
                        amount: 0,
                        currency: value.currency
                    };

                    group.push(res[value.currency])
                }
    
                res[value.currency].amount += value.amount;
    
                return res;
            }, {});
    
            this.setState({
                isLoaded: true,
                own: group,
                credits: credits,
                accounts: items
            });
        });
    }

    render() {
        return (
            <div className={styles.container}>
                <DashboardBalance own={this.state.own} credits={this.state.credits}/>
                <DashboardDeposits accounts={this.state.accounts} />
            </div>
        );
    }
}