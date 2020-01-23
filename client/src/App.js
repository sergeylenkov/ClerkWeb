import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Menu from './components/menu/Menu.js';
import Dashboard from './components/dashboard/Dashboard.js';
import Transactions from './components/transactions/Transactions.js';
import Reports from './components/reports/Reports.js';

import styles from './App.module.css';

export default class App extends React.Component {
	render() {
    	return (
			<BrowserRouter>
				<div className={styles.container}>
					<div className={styles.navigation}>
						<img className={styles.logo} src="logo.png" alt="Logo" />
						<div className={styles.menu}>
							<Menu onChange={this.onMenuChange} />
						</div>
					</div>
					<div className={styles.content}>
						<div className={styles.page}>
							<Switch>
								<Route exact path="/">
									<Dashboard />
								</Route>
								<Route path="/transactions">
									<Transactions />
								</Route>
								<Route path="/reports">
									<Reports />
								</Route>
							</Switch>
						</div>
					</div>
				</div>
			</BrowserRouter>
    	);
  	}
}