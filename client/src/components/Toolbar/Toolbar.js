import React from 'react';
import { ToolbarAlarmButton } from './Alarm/Button.js';
import { ToolbarAlarmPanel } from './Alarm/Panel.js';
import { ToolbarAddButton } from './Add/Button.js';
import { ToolbarAddPanel } from './Add/Panel.js';

import styles from './Toolbar.module.css';

export class Toolbar extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			isAlarmPanelVisible: false,
			isAddPanelVisible: false
		}

		this.onAlarm = this.onAlarm.bind(this)
		this.onAdd = this.onAdd.bind(this)
		this.onAddExpand = this.onAddExpand.bind(this)
	}

	render() {
		let alarmPanel = null;
		let addPanel = null;

		if (this.state.isAlarmPanelVisible) {
			alarmPanel = <ToolbarAlarmPanel />
		}

		if (this.state.isAddPanelVisible) {
			addPanel = <ToolbarAddPanel />
		}

    	return (
    	  	<div className={styles.container}>
			  	<div className={styles.add}>
				  	<ToolbarAddButton onClick={this.onAdd} onExpand={this.onAddExpand} />
					{addPanel}
			  	</div>
				<div className={styles.alarm}>
        			<ToolbarAlarmButton badgeCount={3} onClick={this.onAlarm} />
					{alarmPanel}
				</div>
      		</div>
    	);
	}
	  
	onAlarm() {
		const visible = !this.state.isAlarmPanelVisible;

		this.setState({
			isAlarmPanelVisible: visible
		});
	}

	onAdd() {

	}

	onAddExpand() {
		const visible = !this.state.isAddPanelVisible;

		this.setState({
			isAddPanelVisible: visible
		});
	}
}