import React from 'react';
import { MenuButton } from './Button.js';
import { MenuExpandButton } from './ExpandButton.js';
import { MenuIcons } from './Icons.js';

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
        fetch("http://localhost:5000/accounts").then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
            const expenses = data.items.filter(el => el.type === 2);
            const receipts = data.items.filter(el => el.type === 0);
            const deposits = data.items.filter(el => el.type === 1);
            const credits = data.items.filter(el => el.type === 4);
            const virtual = data.items.filter(el => el.type === 5);

            this.setState({
                expenses: expenses,
                receipts: receipts,
                deposits: deposits,
                credits: credits,
                virtual: virtual
            });
        }).catch((error) => {
            console.log(error);           
        });
    }

    render() {
        return (
            <div className={styles.container}>
                <MenuExpandButton icon={this.props.icon} title={this.props.title} isSelected={this.props.isSelected} onClick={this.onAccountsSelect} onExpand={this.onAccountsExpand}/>

                <div className={`${styles.group} ${this.state.isAccountExpanded ? styles.expanded : ''}`}>
                    <MenuExpandButton icon={MenuIcons.accounts} title={'Receipts'} onClick={this.onAccountsSelect} onExpand={this.onReceiptsExpand}/>

                    <div className={`${styles.group} ${this.state.isReceiptsExpanded ? styles.expanded : ''}`}>
                        {
                            this.state.receipts.map((item, i) => {
                                return (<MenuButton key={item.id} icon={MenuIcons.accounts} title={item.name} onClick={this.onAccountSelect} />)
                            })
                        }
                    </div>

                    <MenuExpandButton icon={MenuIcons.accounts} title={'Deposits'} onClick={this.onAccountsSelect} onExpand={this.onDepositsExpand}/>

                    <div className={`${styles.group} ${this.state.isDepositsExpanded ? styles.expanded : ''}`}>
                        {
                            this.state.deposits.map((item, i) => {
                                return (<MenuButton key={item.id} icon={MenuIcons.accounts} title={item.name} onClick={this.onAccountSelect} />)
                            })
                        }
                    </div>

                    <MenuExpandButton icon={MenuIcons.accounts} title={'Expenses'} onClick={this.onAccountsSelect} onExpand={this.onExpensesExpand}/>

                    <div className={`${styles.group} ${this.state.isExpensesExpanded ? styles.expanded : ''}`}>
                        {
                            this.state.expenses.map((item, i) => {
                                return (<MenuButton key={item.id} icon={MenuIcons.accounts} title={item.name} onClick={this.onAccountSelect} />)
                            })
                        }
                    </div>

                    <MenuExpandButton icon={MenuIcons.accounts} title={'Credits'} onClick={this.onAccountsSelect} onExpand={this.onCreditsExpand}/>

                    <div className={`${styles.group} ${this.state.isCreditsExpanded ? styles.expanded : ''}`}>
                        {
                            this.state.credits.map((item, i) => {
                                return (<MenuButton key={item.id} icon={MenuIcons.accounts} title={item.name} onClick={this.onAccountSelect} />)
                            })
                        }
                    </div>

                    <MenuExpandButton icon={MenuIcons.accounts} title={'Virtual'} onClick={this.onAccountsSelect} onExpand={this.onVirtualExpand}/>

                    <div className={`${styles.group} ${this.state.isVirtualExpanded ? styles.expanded : ''}`}>
                        {
                            this.state.virtual.map((item, i) => {
                                return (<MenuButton key={item.id} icon={MenuIcons.accounts} title={item.name} onClick={this.onAccountSelect} />)
                            })
                        }
                    </div>
                </div>
            </div>
        );        
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

    onAccountsSelect() {
        this.props.onAccountsSelect();
    }

    onAccountSelect(id) {
        console.log(id);
    }
}