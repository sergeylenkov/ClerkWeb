import React from 'react';

export class AccountsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            expenses: [],
            deposits: [],
            receipts: [],
            credits: []
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
                <div className="account-list">
                    <div className="account-list-header">Receipts</div>

                    {receipts.map((item, i) => {
                        return (<div className="account-list-item" key={item.id}>{item.name}</div>); 
                    })}

                    <div className="account-list-header">Deposits</div>
                    
                    {deposits.map((item, i) => {
                        return (<div className="account-list-item" key={item.id}>{item.name}</div>); 
                    })}

                    <div className="account-list-header">Expenses</div>
                    
                    {expenses.map((item, i) => {
                        return (<div className="account-list-item" key={item.id}>{item.name}</div>); 
                    })}

                    <div className="account-list-header">Credits</div>
                    
                    {credits.map((item, i) => {
                        return (<div className="account-list-item" key={item.id}>{item.name}</div>); 
                    })}
                </div>
            );
        }
    }
}