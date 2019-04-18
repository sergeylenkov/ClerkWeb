import React from 'react';
import { Menu, MenuTypes } from './components/menu/Menu.js';
import { Pages } from './components/pages/Pages.js';

import styles from './App.module.css';

export default class App extends React.Component {
	constructor(props) {
   		super(props);

    	this.state = {
			activePage: MenuTypes.Dashboard,
		}
		
		this.onMenuChange = this.onMenuChange.bind(this);		
	}

	render() {
    	return (
    	  	<div className={styles.container}>
			  	<div className={styles.navigation}>
				  	<img className={styles.logo} src="logo.png" alt="Logo" />
        			<div className={styles.menu}><Menu onChange={this.onMenuChange} /></div>
				</div>
        		<div className={styles.content}>
					<Pages activePage={this.state.activePage} />
				</div>
      		</div>
    	);
  	}

  	onMenuChange(type) {
    	this.setState({
			activePage: type
		});
	}
}