import React from 'react';
import moment from 'moment';
import { DataHelper } from '../../../data/Data.js';
import { BudgetsListItem } from './Item.js';
import { BudgetsListAddButton } from './AddButton.js';

import styles from './List.module.css';

export class BudgetsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {            
            budgets: []
        };

        this.onAdd = this.onAdd.bind(this)
    }

    componentDidMount() {
        const data = new DataHelper();

        const from = new moment().startOf('month');
        const to = new moment().endOf('month');

        data.budgets(from, to).then((items) => {
            this.setState({
                budgets: items
            });
        });
    }

    render() {
        return (                
            <div className={styles.container}>
                <BudgetsListAddButton onClick={this.onAdd}/>
                {
                    this.state.budgets.map((item, i) => {
                        return (<BudgetsListItem key={item.id} item={item} />); 
                    })
                }
            </div>
        );
    }

    onAdd() {

    }
}