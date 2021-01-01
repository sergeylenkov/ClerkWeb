import React, { Component } from 'react';
import { Switch, Route, withRouter, RouteComponentProps } from 'react-router-dom';
import { withTranslation, WithTranslation } from 'react-i18next';
import ReportTab from './Tab';
import ExpensesByMonth from './ExpensesByMonth';
import ExpensesByAccount from './ExpensesByAccount';

import styles from './index.module.css';

type ReportsProps = RouteComponentProps<{}> & WithTranslation;

class Reports extends Component<ReportsProps> {
  constructor(props: ReportsProps) {
    super(props);

    this.onTabSelect = this.onTabSelect.bind(this);
  }

  onTabSelect(path: string) {
    this.props.history.push(path);
  }

  render() {
    const { pathname } = this.props.location;
    const { t } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.tabs}>
          <ReportTab
            title={t('reports.expensesByMonth')}
            value='/reports/expenses_by_month'
            isSelected={pathname === '/reports/expenses_by_month'}
            onClick={this.onTabSelect}
          />
          <ReportTab
            title={t('reports.expensesForPeriod')}
            value='/reports/expenses_by_account'
            isSelected={pathname === '/reports/expenses_by_account'}
            onClick={this.onTabSelect}
          />
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
    );
  }
}

export default withRouter(withTranslation()(Reports));
