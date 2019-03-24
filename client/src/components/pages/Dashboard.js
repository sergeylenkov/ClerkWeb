import React from 'react';
import moment from 'moment';
import { DataHelper } from '../../data/Data.js';
import { DashboardBalance } from './dashboard/Balance';
import { DashboardDeposits } from './dashboard/Deposits.js';
import { DashboardExpenses } from './dashboard/Expenses.js';
import { DashboardBudgets } from './dashboard/Budgets.js';
import  {DashboardGoals } from './dashboard/Goals.js';

import styles from './Dashboard.module.css';

export class DashboardPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            own: [],
            credits: [],
            accounts: [],
            expenses: [],
            budgets: [],
            goals: []
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
                own: group,
                credits: credits,
                accounts: items
            });       
        });

        const from = new moment().startOf('month');
        const to = new moment().endOf('month');

        data.expenses(from, to).then((expenses) => {
            this.setState({
                expenses: expenses
            });
        });

        data.budgets(from, to).then((budgets) => {
            this.setState({            
                budgets: budgets
            });
        });

        data.goals().then((goals) => {
            this.setState({            
                goals: goals
            });
        });  
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.balance}>
                    <DashboardBalance own={this.state.own} credits={this.state.credits} />
                    <DashboardDeposits accounts={this.state.accounts} />
                </div>                
                <DashboardExpenses expenses={this.state.expenses} />
                <DashboardBudgets budgets={this.state.budgets} />
                <DashboardGoals goals={this.state.goals} />
            </div>
        );
    }
}