import React from 'react';
import { BudgetTypes } from '../../../data/Data.js';
import { formatAmount } from '../../Utils.js';

import styles from './Item.module.css';

export class BudgetsListItem extends React.Component {
    render() {
        let type = '';

        switch (this.props.item.period) {
            case BudgetTypes.Week:
                type = 'Weekly';
                break;

            case BudgetTypes.Month:
                type = 'Monthly';
                break;

            case BudgetTypes.Year:
                type = 'Yearly';
                break;

            case BudgetTypes.Custom:
                type = 'Date';
                break;

            default:
                break;
        }

        return (                
            <div className={styles.container}>
                <div className={styles.name}>{this.props.item.name}</div>
                <div className={styles.type}>{type}</div>
                <div className={styles.amount}>{formatAmount(this.props.item.amount, '')}</div>
            </div>
        );
    }
}