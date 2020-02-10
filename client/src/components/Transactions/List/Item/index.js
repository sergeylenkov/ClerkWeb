import React from 'react';
import moment from 'moment';
import { Icon, Icons } from '../../../Icon.js';
import { formatAmount, formatDate } from '../../../Utils';
import TransactionsListItemMenu from '../ContextMenu';

import styles from './index.module.css';

export default class TransactionsListItem extends React.Component {
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
        this.hideMenu = this.hideMenu.bind(this);
    }

    hideMenu() {
        document.removeEventListener('click', this.hideMenu);

        this.setState({
            isMenuVisible: false
        });
    }

    onMenu() {
        const visible = !this.state.isMenuVisible;

        if (visible) {
            document.addEventListener('click', this.hideMenu);

            this.setState({
                isMenuVisible: true
            });
        } else {
            this.hideMenu();
        }
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

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.date}>{formatDate(moment(this.props.item.date, 'YYYY-MM-DD'))}</div>
                <div className={styles.fromName}>{this.props.item.fromName}</div>
                <div className={styles.toName}>{this.props.item.toName}</div>
                <div className={styles.tags}>
                    {
                        this.props.item.tags.map((tag, i) => {
                            return (<div key={i} className={styles.tag}>{tag.name}</div>)
                        })
                    }
                </div>
                <div className={styles.amount}>{formatAmount(this.props.item.fromAmount, '')}</div>
                <div className={styles.options} onClick={this.onMenu}><Icon svg={Icons.options}/></div>
                { this.state.isMenuVisible ? <TransactionsListItemMenu onEdit={this.onEdit} onCopy={this.onCopy} onSplit={this.onSplit} onDelete={this.onDelete} /> : null }
            </div>
        );
    }
}