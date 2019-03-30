import React from 'react';
import { DataHelper } from '../../../data/Data.js';
import { BudgetsListItem } from './Item.js';

import styles from './List.module.css';

export class BudgetsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {            
            budgets: []
        };
    }

    componentDidMount() {
        const data = new DataHelper();

        data.budgets().then((items) => {
            this.setState({
                budgets: items
            });
        });
    }

    render() {
        return (                
            <div className={styles.container}>                    
                {
                    this.state.budgets.map((item, i) => {
                        return (<BudgetsListItem key={item.id} item={item} />); 
                    })
                }
            </div>
        );
    }
}