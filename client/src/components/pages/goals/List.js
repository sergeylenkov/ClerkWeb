import React from 'react';
import { DataHelper } from '../../../data/Data.js';
import { GoalsListItem } from './Item.js';
import { GoalsListAddButton } from './AddButton.js';

import styles from './List.module.css';

export class GoalsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {            
            goals: []
        };

        this.onAdd = this.onAdd.bind(this)
    }

    componentDidMount() {
        const data = new DataHelper();

        data.goals().then((items) => {
            this.setState({
                goals: items
            });
        });
    }

    render() {
        return (                
            <div className={styles.container}>
                <GoalsListAddButton onClick={this.onAdd}/>
                {
                    this.state.goals.map((item, i) => {
                        return (<GoalsListItem key={item.id} item={item} />); 
                    })
                }
            </div>
        );
    }

    onAdd() {
        
    }
}