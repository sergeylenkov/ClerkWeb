import React from 'react';

export class AccountsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch("http://localhost:5000/accounts").then((response) => {
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
                <div className="account-list">
                    {items.map((item, i) => {
                        return (<div key={item.id}>{item.name}</div>); 
                    })}
                </div>
            );
        }
    }
}