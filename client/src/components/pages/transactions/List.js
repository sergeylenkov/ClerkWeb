import React from 'react';
import moment from 'moment';
import { DataHelper } from '../../../data/Data.js';
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
        const data = new DataHelper();

        const from = new moment().startOf('month');
        const to = new moment().endOf('month');

        data.transactions(from, to).then((items) => {
            this.setState({
                transactions: items
            });
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