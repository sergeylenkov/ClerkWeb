import React from 'react';
import { Menu, MenuTypes } from './components/menu/Menu.js';
import Dashboard from './components/dashboard/Dashboard.js';
import Transactions from './components/transactions/Transactions.js';
import Reports from './components/reports/Reports.js';

import styles from './App.module.css';

export default class App extends React.Component {
	constructor(props) {
   		super(props);

    	this.state = {
			selectedPage: MenuTypes.Dashboard,
		}

		this.onMenuChange = this.onMenuChange.bind(this);
	}

	render() {
		let page = null;

		switch (this.state.selectedPage) {
			case MenuTypes.Dashboard:
				page = <Dashboard />
				break;

			case MenuTypes.Transactions:
				page = <Transactions />
				break;

			case MenuTypes.Reports:
				page = <Reports />
				break;

			default:
				page = null;
		}

    	return (
    	  	<div className={styles.container}>
			  	<div className={styles.navigation}>
				  	<img className={styles.logo} src="logo.png" alt="Logo" />
        			<div className={styles.menu}>
						<Menu onChange={this.onMenuChange} />
					</div>
				</div>
        		<div className={styles.content}>
					<div className={styles.page}>
						{page}
					</div>
				</div>
      		</div>
    	);
  	}

  	onMenuChange(type) {
    	this.setState({
			selectedPage: type
		});
	}
}