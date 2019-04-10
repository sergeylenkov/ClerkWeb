import React from 'react';

import styles from './Filter.module.css';

export class TransactionsFilter extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <button className={styles.button}><div className={styles.label}>{'Month'}</div></button>
            </div>
        )
    }
}