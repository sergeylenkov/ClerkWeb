import React from 'react';
import moment from 'moment';
import { DataHelper } from '../../../data/Data.js';
import { DashboardBalance } from './Balance';
import { DashboardDeposits } from './Deposits.js';
import { DashboardExpenses } from './Expenses.js';
import { DashboardBudgets } from './Budgets.js';
import { DashboardGoals } from './Goals.js';
import { DashboardCredits } from './Credits.js';
import { DashboardSchedulers } from './Schedulers.js';

import styles from './Dashboard.module.css';

export class DashboardPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ownFunds: [],
            creditFunds: [],
            accounts: [],
            expenses: [],
            budgets: [],
            goals: [],
            credits: [],
            schedulers: []
        }
    }

    componentDidMount() {
        const data = new DataHelper();

        data.dashboardBalance().then((items) => {
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
                ownFunds: group,
                creditFunds: credits,
                accounts: items
            });       
        });

        let from = moment().startOf('month');
        let to = moment().endOf('month');
        

        data.dashboardExpenses(from, to).then((expenses) => {
            this.setState({
                expenses: expenses
            });
        });

        data.dashboardBudgets(from, to).then((budgets) => {
            this.setState({            
                budgets: budgets
            });
        });

        data.dashboardGoals().then((goals) => {
            this.setState({            
                goals: goals
            });
        });

        data.dashboardCredits().then((credits) => {
            this.setState({
                credits: credits
            });
        });

        from = moment();
        to = moment().add(31, 'd');

        data.dashboardSchedulers(from, to).then((schedulers) => {
            this.setState({
                schedulers: schedulers
            });
        });
    }

    render() {
        return (
            <div className={styles.container}>
                <DashboardBalance own={this.state.ownFunds} credits={this.state.creditFunds} />
                <DashboardDeposits accounts={this.state.accounts} />
                <DashboardExpenses expenses={this.state.expenses} />
                <DashboardBudgets budgets={this.state.budgets} />
                <DashboardGoals goals={this.state.goals} />
                <DashboardCredits credits={this.state.credits} />
                <DashboardSchedulers schedulers={this.state.schedulers} />
            </div>
        );
    }
}