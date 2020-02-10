import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Menu from 'components/Menu';
import Dashboard from 'components/Dashboard';
import Transactions from 'components/Transactions';
import Reports from 'components/Reports';

import styles from './App.module.css';

export default class App extends React.Component {
	render() {
    	return (
			<BrowserRouter>
				<div className={styles.container}>
					<div className={styles.navigation}>
						<img className={styles.logo} src='/logo.png' alt='Logo' />
						<div className={styles.menu}>
							<Menu onChange={this.onMenuChange} />
						</div>
					</div>
					<div className={styles.content}>
						<div className={styles.page}>
							<Switch>
								<Route exact path='/'>
									<Dashboard />
								</Route>
								<Route path='/transactions'>
									<Transactions />
								</Route>
								<Route path='/reports'>
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