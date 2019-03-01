import React from 'react';
import { AccountButton } from './Button.js';

import styles from './List.module.css';

export class AccountsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            expenses: [],
            deposits: [],
            receipts: [],
            credits: [],
            activeItem: 0
        };
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

            this.setState({
                isLoaded: true,
                expenses: expenses,
                receipts: receipts,
                deposits: deposits,
                credits: credits                
            });
        }).catch((error) => {
            console.log(error);
            this.setState({
                error: error
            });
        });
    }

    render() {
        const { error, isLoaded, receipts, expenses, deposits, credits } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (                
                <div className={styles.container}>                    
                    <div className={styles.header}>Приход</div>

                    {receipts.map((item, i) => {
                        const active = (item.id === this.state.activeItem);
                        return (<AccountButton key={item.id} account={item} isActive={active} onClick={(id) => this.onAccountSelect(id)} />)
                    })}                    

                    <div className={styles.header}>Депозиты</div>
                    
                    {deposits.map((item, i) => {
                        const active = (item.id === this.state.activeItem);
                        return (<AccountButton key={item.id} account={item} isActive={active} onClick={(id) => this.onAccountSelect(id)} />)
                    })}

                    <div className={styles.header}>Расходы</div>
                    
                    {expenses.map((item, i) => {
                        const active = (item.id === this.state.activeItem);
                        return (<AccountButton key={item.id} account={item} isActive={active} onClick={(id) => this.onAccountSelect(id)} />)
                    })}

                    <div className={styles.header}>Кредиты</div>
                    
                    {credits.map((item, i) => {
                        const active = (item.id === this.state.activeItem);
                        return (<AccountButton key={item.id} account={item} isActive={active} onClick={(id) => this.onAccountSelect(id)} />)
                    })}
                </div>
            );
        }
    }

    onAccountSelect(id) {

    }
}