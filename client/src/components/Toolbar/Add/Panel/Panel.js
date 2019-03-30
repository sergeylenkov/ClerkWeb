import React from 'react';
import { ToolbarAddPanelItem } from './Item.js';

import styles from './Panel.module.css';

export class ToolbarAddPanel extends React.Component {
    constructor(props) {
        super(props);

        this.onSelect = this.onSelect.bind(this);
    }

    render() {
        return (
            <div className={styles.container}>
            {
                this.props.items.map((item, i) => {
                    return <ToolbarAddPanelItem key={item.id} item={item} onClick={this.onSelect} />
                })
            }
            </div>
        );
    }

    onSelect(id) {
        this.props.onSelect(id)
    }
}