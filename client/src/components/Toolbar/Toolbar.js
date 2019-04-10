import React from 'react';
import { DataHelper } from '.././../data/Data.js';
import { ToolbarAlarmButton } from './Alarm/Button.js';
import { ToolbarAlarmPanel } from './Alarm/Panel.js';
import { ToolbarAddButton } from './Add/Button.js';
import { ToolbarAddPanel } from './Add/Panel/Panel.js';

import styles from './Toolbar.module.css';

export class Toolbar extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			isAlarmPanelVisible: false,
			isAddPanelVisible: false,
			recent: []
		}

		this.onAlarm = this.onAlarm.bind(this)
		this.onAdd = this.onAdd.bind(this)
		this.onAddExpand = this.onAddExpand.bind(this)
		this.onTransactionSelect = this.onTransactionSelect.bind(this)
	}

	componentDidMount() {
        const data = new DataHelper();

        data.recentTransactions(10).then((items => {
            this.setState({
                recent: items
            });
        }));
    }


	render() {
		let alarmPanel = null;
		let addPanel = null;

		if (this.state.isAlarmPanelVisible) {
			alarmPanel = <ToolbarAlarmPanel />
		}

		if (this.state.isAddPanelVisible) {
			addPanel = <ToolbarAddPanel items={this.state.recent} onSelect={this.onTransactionSelect} />
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
		this.setState({
			isAddPanelVisible: false
		});

		this.props.onAddTransaction();
	}

	onAddExpand() {
		const visible = !this.state.isAddPanelVisible;

		this.setState({
			isAddPanelVisible: visible
		});
	}

	onTransactionSelect(id) {
		this.setState({
			isAddPanelVisible: false
		});

		this.props.onAddTransaction(id);
	}
}