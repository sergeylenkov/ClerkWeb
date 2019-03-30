import React from 'react';
import { ToolbarAlarmButton } from './AlarmButton.js';
import { ToolbarAddButton } from './AddButton.js';

import styles from './Toolbar.module.css';

export class Toolbar extends React.Component {
	constructor(props) {
		super(props)

		this.onAlarm = this.onAlarm.bind(this)
		this.onAdd = this.onAdd.bind(this)
		this.onAddExpand = this.onAddExpand.bind(this)
	}

	render() {
    	return (
    	  	<div className={styles.container}>
			  	<div className={styles.add}>
				  <ToolbarAddButton onClick={this.onAdd} onExpand={this.onAddExpand} />
			  	</div>
				<div className={styles.alarm}>
        			<ToolbarAlarmButton badgeCount={3} onClick={this.onAlarm} />
				</div>
      		</div>
    	);
	}
	  
	onAlarm() {

	}

	onAdd() {

	}

	onAddExpand() {

	}
}