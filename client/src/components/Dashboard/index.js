import React from 'react';
import moment from 'moment';
import Data, { AccountTypes } from 'data/Data.js';
import { DashboardBalance } from './Balance';
import { DashboardDeposits } from './Deposits';
import { DashboardExpenses } from './Expenses';
import { DashboardBudgets } from './Budgets';
import { DashboardGoals } from './Goals';
import { DashboardDebts } from './Debts';
import { DashboardSchedulers } from './Schedulers';
import { convertExchangeRates } from 'components/Utils';

import styles from './index.module.css';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ownFunds: [],
            creditFunds: [],
            accounts: [],
            expenses: [],
            budgets: [],
            goals: [],
            debts: [],
            schedulers: [],
            total: { amount: 0, currency: 'RUB' },
            totalExpenses: { amount: 0, currency: 'RUB' },
        }

        this.data = new Data();
    }

    componentDidMount() {
        this.data.exchange.getExchangeRates().then(() => {
            this.data.dashboard.getBalance().then((items) => {
                let own = [];
                let credits = [];
                let currency = {};

                items.forEach(item => {
                    if (item.amount > 0 && item.type !== AccountTypes.Virtual) {
                        if (!currency[item.currency]) {
                            currency[item.currency] = 0;
                        }

                        currency[item.currency] = currency[item.currency] + item.amount;
                    }

                    if (item.credit) {
                        credits.push(item);
                    }
                });

                const keys = Object.keys(currency);
                own = keys.map(key => {
                    return { currency: key, amount: currency[key] };
                });

                const total = items.reduce((accumulator, item) => {
                    return accumulator = accumulator + convertExchangeRates(item.currency, 'RUB', item.amount);
                }, 0);

                this.setState({
                    ownFunds: own,
                    creditFunds: credits,
                    accounts: items,
                    total: { amount: total, currency: 'RUB' }
                });
            });
        });

        let from = moment().startOf('month');
        let to = moment().endOf('month');

        this.data.dashboard.getExpenses(from, to).then((expenses) => {
            const total = expenses.reduce((accumulator, item) => {
                return accumulator + convertExchangeRates(item.currency, 'RUB', item.amount);
            }, 0);

            this.setState({
                expenses: expenses,
                totalExpenses: { amount: total, currency: 'RUB' }
            });
        });

        this.data.dashboard.getBudgets(from, to).then((budgets) => {
            this.setState({
                budgets: budgets
            });
        });

        this.data.dashboard.getGoals().then((goals) => {
            this.setState({
                goals: goals
            });
        });

        this.data.dashboard.getDebts().then((debts) => {
            this.setState({
                debts: debts
            });
        });

        from = moment();
        to = moment().add(31, 'd');

        this.data.dashboard.getSchedulers(from, to).then((schedulers) => {
            this.setState({
                schedulers: schedulers
            });
        });
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.left}>
                    <DashboardBalance total={this.state.total} own={this.state.ownFunds} credits={this.state.creditFunds} />
                    <DashboardDeposits accounts={this.state.accounts} />
                    <DashboardExpenses expenses={this.state.expenses} totalExpenses={this.state.totalExpenses} />
                </div>
                <div className={styles.right}>
                    <DashboardSchedulers schedulers={this.state.schedulers} />
                    <DashboardBudgets budgets={this.state.budgets} />
                    <DashboardGoals goals={this.state.goals} />
                    <DashboardDebts debts={this.state.debts} />
                </div>
            </div>
        );
    }
}