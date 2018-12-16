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
        }).catch((error) => {
            console.log(error);
            this.setState({
                error: error
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
                    <div>Own funds</div>
                    {items.map((item, i) => {
                        const amount = (item.receipt - item.expense).toFixed(2);

                        return (<div key={item.id}>{item.name} {amount} {item.currency}</div>); 
                    })}

                    <div>Credit funds</div>
                </div>
            );
        }
    }
}