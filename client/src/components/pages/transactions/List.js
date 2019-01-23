import React from 'react';

export class TransactionsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch("http://localhost:5000/transactions").then((response) => {
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
                <div className="transactions-list">                    
                    {items.map((item, i) => {
                        return (<div className="transactions-list-item" key={item.id}>{item.fromName} {item.toName}</div>); 
                    })}
                </div>
            );
        }
    }
}