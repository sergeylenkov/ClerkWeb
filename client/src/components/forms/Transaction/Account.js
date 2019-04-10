import React from 'react';
import { Icon, getAccountIcon } from '../../Icon.js';
import { TransactionAccountsList } from'./List.js';

import styles from './Account.module.css';

export class TransactionAccountField extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isExpanded: false,
            account: null
        }

        this.onExpand = this.onExpand.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    render() {
        let list = null;

        if (this.state.isExpanded) {
            list = <TransactionAccountsList accounts={this.props.listAccounts} onSelect={this.onSelect}/>
        }

        let account = this.props.account;

        if (this.state.account) {
            account = this.state.account;
        }

        return (
            <div className={styles.container}>
                <div className={styles.placeholder}>
                    <div className={styles.title}>{this.props.title}</div>
                    <div className={styles.account}>
                        <div className={styles.icon}><Icon svg={getAccountIcon(account.icon)}/></div>
                        <div className={styles.name}>{account.name}</div>
                    </div>
                </div>
                <div className={styles.expandButton} onClick={this.onExpand}>
                    <div className={styles.arrow}></div>
                </div>
                {list}
            </div>
        );
    }    

    onExpand(e) {
        e.stopPropagation();
        
        const expanded = !this.state.isExpanded;

        this.setState({
            isExpanded: expanded
        });
    }

    onSelect(account) {
        this.setState({
            isExpanded: false,
            account: account
        });
    }
}