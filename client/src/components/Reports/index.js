import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import ReportTab from './Tab';
import ExpensesByMonth from './ExpensesByMonth';
import ExpensesByAccount from './ExpensesByAccount';
import styles from './index.module.css';

class Reports extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [
                { id: 0, title: 'Expenses By Month', path: '/reports/expenses_by_month' },
                { id: 1, title: 'Expenses For Period', path: '/reports/expenses_by_account' },
            ]
        };

        this.onTabSelect = this.onTabSelect.bind(this);
    }

    onTabSelect(path) {
        this.props.history.push(path);
    }

    render() {
        const { pathname } = this.props.location;

        return (
            <div className={styles.container}>
                <div className={styles.tabs}>
                {
                    this.state.items.map(item => {
                        const selected = item.path === pathname;

                        return (
                            <ReportTab
                                key={item.id}
                                title={item.title}
                                value={item.path}
                                isSelected={selected}
                                onClick={this.onTabSelect}
                            />
                        )
                    })
                }
                </div>
                <div className={styles.content}>
                    <Switch>
                        <Route path='/reports/expenses_by_month'>
                            <ExpensesByMonth />
                        </Route>
                        <Route path='/reports/expenses_by_account'>
                            <ExpensesByAccount />
                        </Route>
                    </Switch>
                </div>
            </div>
        )
    }
}

export default withRouter(Reports)