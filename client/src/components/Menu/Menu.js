import React from 'react';
import { MenuButton } from './Button.js';

import styles from './Menu.module.css';

export class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [
                { title: 'Обзор', selected: false },
                { title: 'Счета', selected: false },
                { title: 'Бюджет и цели', selected: false },                
                { title: 'Планируемые транзакции', selected: false },
                { title: 'Отчеты', selected: false },
                { title: 'Теги', selected: false }                
            ],
            selectedItem: 0
        };
    }

    handleClick(i) {        
        this.setState({
            selectedItem: i
        });

        this.props.onChange(i);
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.buttons}>
                    {
                        this.state.items.map((item, i) => {
                            const selected = (i === this.state.selectedItem);
                            return (<MenuButton key={i} title={item.title} isSelected={selected} onClick={() => this.handleClick(i)} />) 
                        })
                    }
                </div>
            </div>
        );        
    }
}