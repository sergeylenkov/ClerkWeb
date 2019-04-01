import React from 'react';
import { Menu, MenuTypes } from './components/menu/Menu.js';
import { Pages } from './components/pages/Pages.js';
import { Toolbar } from './components/toolbar/Toolbar.js';
import { TransactionForm } from './components/forms/Transaction/Transaction.js';

import styles from './App.module.css';

export default class App extends React.Component {
	constructor(props) {
   		super(props);

    	this.state = {
			activePage: MenuTypes.Dashboard,
			transactionFormVisible: false
		}
		
		this.pageDidChanged = this.pageDidChanged.bind(this)
		this.onAddTransaction = this.onAddTransaction.bind(this)
		this.onCloseTransaction = this.onCloseTransaction.bind(this)
	}

	render() {
		let transactionForm = null;

		if (this.state.transactionFormVisible) {
			transactionForm = <TransactionForm onClose={this.onCloseTransaction} />
		}

    	return (
    	  	<div className={styles.container}>
			  	<Toolbar onAddTransaction={this.onAddTransaction}/>
        		<Menu onChange={this.pageDidChanged}/>
        		<Pages activePage={this.state.activePage}/>
				{transactionForm}
      		</div>
    	);
  	}

  	pageDidChanged(type) {
    	this.setState({
			activePage: type
		});
	}
	  
	onAddTransaction(id) {
		this.setState({
			transactionFormVisible: true
		});
	}

	onCloseTransaction() {
		this.setState({
			transactionFormVisible: false
		});
	}
}