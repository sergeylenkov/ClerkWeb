import React from 'react';
import { Icon, Icons } from '../../Icon';

import styles from './Button.module.css';

export class ToolbarAlarmButton extends React.Component {
    constructor(props) {
        super(props);

        this.onClick= this.onClick.bind(this);
    }

    render() {
        let badge = null;

        if (this.props.badgeCount > 0) {
            badge = <div className={styles.badge}>{this.props.badgeCount}</div>
        }

        return (
            <button className={styles.container} onClick={this.onClick}>                
                <div className={styles.icon}><Icon svg={Icons.bell}/></div>
                {badge}
            </button>
        );
    }

    onClick() {
        this.props.onClick();
    }
}