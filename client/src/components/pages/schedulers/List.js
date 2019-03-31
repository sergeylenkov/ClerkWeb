import React from 'react';
import { DataHelper } from '../../../data/Data.js';
import { SchedulersListItem } from './Item.js';
import { SchedulersListAddButton } from './AddButton.js';

import styles from './List.module.css';

export class SchedulersList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {            
            schedulers: []
        };

        this.onAdd = this.onAdd.bind(this)
    }

    componentDidMount() {
        const data = new DataHelper();

        data.schedulers().then((items) => {
            this.setState({
                schedulers: items
            });
        });
    }

    render() {
        return (                
            <div className={styles.container}>
                <SchedulersListAddButton onClick={this.onAdd}/>
                {
                    this.state.schedulers.map((item, i) => {
                        return (<SchedulersListItem key={item.id} item={item} />); 
                    })
                }
            </div>
        );
    }

    onAdd() {
        
    }
}