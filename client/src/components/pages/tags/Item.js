import React from 'react';

import styles from './Item.module.css';

export class TagsListItem extends React.Component {
    render() {
        return (                
            <div className={styles.container}>
                <div className={styles.name}>{this.props.item.name}</div>
                <div className={styles.count}>{this.props.item.count}</div>
            </div>
        );
    }
}