import React from 'react';
import { Icon, Icons } from '../../Icon.js';
import { TransactionsListItemMenu } from './Menu.js';

import { formatAmount, formatDate } from '../../Utils.js';

import styles from './Item.module.css';

export class TransactionsListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isMenuVisible: false
        }

        this.onMenu = this.onMenu.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onCopy = this.onCopy.bind(this);
        this.onSplit = this.onSplit.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    render() {
        return (                
            <div className={styles.container}>
                <div className={styles.date}>{formatDate(this.props.item.date)}</div>
                <div className={styles.fromName}>{this.props.item.fromName}</div>
                <div className={styles.toName}>{this.props.item.toName}</div>
                <div className={styles.amount}>{formatAmount(this.props.item.fromAmount, '')}</div>
                <div className={styles.options} onClick={this.onMenu}><Icon svg={Icons.options}/></div>
                { this.state.isMenuVisible ? <TransactionsListItemMenu onEdit={this.onEdit} onCopy={this.onCopy} onSplit={this.onSplit} onDelete={this.onDelete} /> : null }
            </div>
        );
    }

    onMenu() {
        const visible = !this.state.isMenuVisible;
        
        this.setState({
            isMenuVisible: visible
        });
    }

    onEdit() {
        this.setState({
            isMenuVisible: false
        });
    }

    onCopy() {
        this.setState({
            isMenuVisible: false
        });
    }

    onSplit() {
        this.setState({
            isMenuVisible: false
        });
    }

    onDelete() {
        this.setState({
            isMenuVisible: false
        });
    }
}