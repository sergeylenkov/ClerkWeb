import React from 'react';

export class DashboardBudget extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch("http://localhost:5000/dashboard/balance").then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
            this.setState({
                isLoaded: true,
                items: data.items
            });
        });
    }

    render() {
        const { error, isLoaded, items } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="dashboard-budget-panel">                
                {items.map((item, i) => {
                    return (<div>{item.amount} {item.currency}</div>); 
                })}
            </div>
            );
        }
    }
}