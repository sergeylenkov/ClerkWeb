import React from 'react';

import styles from './Panel.module.css';

export class ToolbarAddPanel extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.item}>
                    <div className={styles.label}>Last transaction here</div>
                </div>
            </div>
        );
    }
}