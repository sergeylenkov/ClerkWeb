import React from 'react';
import { DataHelper, AccountTypes } from '../../data/Data.js';
import { MenuButton } from './Button.js';
import { MenuIcons, AccountsIcons } from '../Icon.js';
import { MenuTypes } from './Menu.js';

import styles from './Accounts.module.css';

export class MenuAccounts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isAccountExpanded: false,
            isReceiptsExpanded: false,
            isDepositsExpanded: false,
            isExpensesExpanded: false,
            isCreditsExpanded: false,
            isVirtualExpanded: false,
            expenses: [],
            deposits: [],
            receipts: [],
            credits: [],
            virtual: []
        }

        this.onAccountsExpand = this.onAccountsExpand.bind(this);
        this.onReceiptsExpand = this.onReceiptsExpand.bind(this);
        this.onDepositsExpand = this.onDepositsExpand.bind(this);
        this.onExpensesExpand = this.onExpensesExpand.bind(this);
        this.onCreditsExpand = this.onCreditsExpand.bind(this);
        this.onVirtualExpand = this.onVirtualExpand.bind(this);
        this.onAccountsSelect = this.onAccountsSelect.bind(this);
        this.onAccountSelect = this.onAccountSelect.bind(this);
    }

    componentDidMount() {
        const data = new DataHelper();

        data.accounts().then((items => {
            const expenses = items.filter(el => el.type === AccountTypes.Expenses);
            const receipts = items.filter(el => el.type === AccountTypes.Receipts);
            const deposits = items.filter(el => el.type === AccountTypes.Deposits);
            const credits = items.filter(el => el.type === AccountTypes.Credits);
            const virtual = items.filter(el => el.type === AccountTypes.Virtaul);

            this.setState({
                expenses: expenses,
                receipts: receipts,
                deposits: deposits,
                credits: credits,
                virtual: virtual
            });
        }));
    }

    render() {
        return (
            <div className={styles.container}>
                <MenuButton value={MenuTypes.Accounts} icon={this.props.icon} title={this.props.title} isSelected={this.props.selection === MenuTypes.Accounts} isExpandable={true} onClick={this.onAccountsSelect} onExpand={this.onAccountsExpand}/>

                <div className={`${styles.group} ${this.state.isAccountExpanded ? styles.expanded : ''}`}>
                    <MenuButton value={MenuTypes.Receipts} icon={MenuIcons.receipts} title={'Receipts'} isSelected={this.props.selection === MenuTypes.Receipts} isExpandable={true} onClick={this.onAccountsSelect} onExpand={this.onReceiptsExpand}/>

                    <div className={`${styles.group} ${this.state.isReceiptsExpanded ? styles.expanded : ''}`}>
                        {
                            this.state.receipts.map((item, i) => {
                                return (<MenuButton key={item.id} value={item.id} icon={this.getIcon(item.icon)} title={item.name} onClick={this.onAccountSelect} />)
                            })
                        }
                    </div>

                    <MenuButton value={MenuTypes.Deposits} icon={MenuIcons.account} title={'Deposits'} isSelected={this.props.selection === MenuTypes.Deposits} isExpandable={true} onClick={this.onAccountsSelect} onExpand={this.onDepositsExpand}/>

                    <div className={`${styles.group} ${this.state.isDepositsExpanded ? styles.expanded : ''}`}>
                        {
                            this.state.deposits.map((item, i) => {
                                return (<MenuButton key={item.id} value={item.id} icon={this.getIcon(item.icon)} title={item.name} onClick={this.onAccountSelect} />)
                            })
                        }
                    </div>

                    <MenuButton value={MenuTypes.Expenses} icon={MenuIcons.expenses} title={'Expenses'} isSelected={this.props.selection === MenuTypes.Expenses} isExpandable={true} onClick={this.onAccountsSelect} onExpand={this.onExpensesExpand}/>

                    <div className={`${styles.group} ${this.state.isExpensesExpanded ? styles.expanded : ''}`}>
                        {
                            this.state.expenses.map((item, i) => {
                                return (<MenuButton key={item.id} value={item.id} icon={this.getIcon(item.icon)} title={item.name} onClick={this.onAccountSelect} />)
                            })
                        }
                    </div>

                    <MenuButton value={MenuTypes.Credits} icon={MenuIcons.account} title={'Credits'} isSelected={this.props.selection === MenuTypes.Credits} isExpandable={true} onClick={this.onAccountsSelect} onExpand={this.onCreditsExpand}/>

                    <div className={`${styles.group} ${this.state.isCreditsExpanded ? styles.expanded : ''}`}>
                        {
                            this.state.credits.map((item, i) => {
                                return (<MenuButton key={item.id} value={item.id} icon={this.getIcon(item.icon)} title={item.name} onClick={this.onAccountSelect} />)
                            })
                        }
                    </div>

                    <MenuButton value={MenuTypes.Virtual} icon={MenuIcons.account} title={'Virtual'} isSelected={this.props.selection === MenuTypes.Virtual} isExpandable={true} onClick={this.onAccountsSelect} onExpand={this.onVirtualExpand}/>

                    <div className={`${styles.group} ${this.state.isVirtualExpanded ? styles.expanded : ''}`}>
                        {
                            this.state.virtual.map((item, i) => {
                                return (<MenuButton key={item.id} value={item.id} icon={this.getIcon(item.icon)} title={item.name} onClick={this.onAccountSelect} />)
                            })
                        }
                    </div>
                </div>
            </div>
        );        
    }

    getIcon(id) {
        if (AccountsIcons[id]) {
            return AccountsIcons[id];
        }

        return AccountsIcons.default;
    }

    onAccountsExpand(expanded) {
        this.setState({
            isAccountExpanded: expanded
        });
    }

    onReceiptsExpand(expanded) {
        this.setState({
            isReceiptsExpanded: expanded
        });
    }

    onDepositsExpand(expanded) {
        this.setState({
            isDepositsExpanded: expanded
        });
    }

    onExpensesExpand(expanded) {
        this.setState({
            isExpensesExpanded: expanded
        });
    }

    onCreditsExpand(expanded) {
        this.setState({
            isCreditsExpanded: expanded
        });
    }

    onVirtualExpand(expanded) {
        this.setState({
            isVirtualExpanded: expanded
        });
    }

    onAccountsSelect(type) {
        this.props.onAccountsSelect(type);
    }

    onAccountSelect(id) {
        this.props.onAccountSelect(id);
    }
}