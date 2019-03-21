import React from 'react';
import { TransactionsListItem } from './Item.js';

import styles from './List.module.css';

export class TransactionsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {            
            transactions: []
        };
    }

    componentDidMount() {
        fetch("http://localhost:5000/transactions").then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
            this.setState({
                transactions: data.items
            });
        }).catch((error) => {
            console.log(error);            
        });
    }

    render() {
        return (                
            <div className={styles.container}>                    
                {
                    this.state.transactions.map((item, i) => {
                        return (<TransactionsListItem key={item.id} item={item} />); 
                    })
                }
            </div>
        );
    }
}