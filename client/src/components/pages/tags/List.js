import React from 'react';
import { DataHelper } from '../../../data/Data.js';
import { TagsListItem } from './Item.js';

import styles from './List.module.css';

export class TagsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {            
            tags: []
        };
    }

    componentDidMount() {
        const data = new DataHelper();

        data.tags().then((items) => {
            this.setState({
                tags: items
            });
        });
    }

    render() {
        return (                
            <div className={styles.container}>                
                {
                    this.state.tags.map((item, i) => {
                        return (<TagsListItem key={item.id} item={item} />); 
                    })
                }
            </div>
        );
    }

    onAdd() {
        
    }
}