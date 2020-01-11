import React from 'react';

import styles from './Menu.module.css';

export default class TransactionsListItemMenu extends React.Component {
    constructor(props) {
        super(props);

        this.onEdit = this.onEdit.bind(this);
        this.onCopy = this.onCopy.bind(this);
        this.onSplit = this.onSplit.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.item} onClick={this.onEdit}><div className={styles.label}>Edit</div></div>
                <div className={styles.item} onClick={this.onCopy}><div className={styles.label}>Copy</div></div>
                <div className={styles.item} onClick={this.onSplit}><div className={styles.label}>Split</div></div>
                <div className={styles.divider}></div>
                <div className={styles.item} onClick={this.onDelete}><div className={styles.label}>Delete</div></div>
            </div>
        );
    }

    onEdit(e) {
        e.stopPropagation();
        this.props.onEdit();
    }

    onCopy(e) {
        e.stopPropagation();
        this.props.onCopy();
    }

    onSplit(e) {
        e.stopPropagation();
        this.props.onSplit();
    }

    onDelete(e) {
        e.stopPropagation();
        this.props.onDelete();
    }
}