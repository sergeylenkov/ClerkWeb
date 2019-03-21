import React from 'react';
import moment from 'moment';
import { DataHelper } from '../../data/Data.js';
import { DashboardBalance } from './dashboard/Balance';
import { DashboardDeposits } from './dashboard/Deposits.js';
import { DashboardExpenses } from './dashboard/Expenses.js';
import { DashboardBudgets } from './dashboard/Budgets.js';

import styles from './Dashboard.module.css';

export class DashboardPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            own: [],
            credits: [],
            accounts: [],
            expenses: [],
            budgets: []
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
    
            const from = new moment().startOf('month');
            const to = new moment().endOf('month');

            data.expenses(from, to).then((expenses) => {
                data.budgets(from, to).then((budgets) => {
                    this.setState({
                        own: group,
                        credits: credits,
                        accounts: items,
                        expenses: expenses,
                        budgets: budgets
                    });
                });
            });            
        });
    }

    render() {
        return (
            <div className={styles.container}>
                <DashboardBalance own={this.state.own} credits={this.state.credits} />
                <DashboardDeposits accounts={this.state.accounts} />
                <DashboardExpenses expenses={this.state.expenses} />
                <DashboardBudgets budgets={this.state.budgets} />
            </div>
        );
    }
}