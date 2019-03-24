import React from 'react';
import { Menu, MenuTypes } from './components/menu/Menu.js';
import { Pages } from './components/pages/Pages.js';
import { Toolbar } from './components/toolbar/Toolbar.js';

import styles from './App.module.css';

export default class App extends React.Component {
	constructor(props) {
   		super(props);

    	this.state = {
        	activePage: MenuTypes.Dashboard
		}
		
		this.pageDidChanged = this.pageDidChanged.bind(this)
	}

	render() {
    	return (
    	  	<div className={styles.container}>
			  	<Toolbar />
        		<Menu onChange={this.pageDidChanged}/>
        		<Pages activePage={this.state.activePage}/>
      		</div>
    	);
  	}

  	pageDidChanged(type) {
    	this.setState({activePage: type});
  	}
}