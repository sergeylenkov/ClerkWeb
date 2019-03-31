import React from 'react';
import { TagsList } from './tags/List.js';

import styles from './Tags.module.css';

export class TagsPage extends React.Component {
    render() {
        return (
            <div className={styles.container}>                
                <TagsList />
            </div>
        )
    }
}