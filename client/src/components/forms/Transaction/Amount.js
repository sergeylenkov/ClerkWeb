import React from 'react';

import styles from './Amount.module.css';

export class TransactionAmountField extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            amount: null
        }

        this.fieldRef = React.createRef();
        this.onChange = this.onChange.bind(this);        
    }

    render() {
        let value = this.props.value;

        if (this.state.value) {
            value = this.state.value;
        }

        return (
            <div className={styles.container}>
                <div className={styles.placeholder}>
                    <div className={styles.title}>{this.props.title}</div>
                    <input ref={this.fieldRef} className={styles.input} value={value} onChange={this.onChange} />
                </div>
            </div>
        );
    } 

    onChange() {
        const value = this.fieldRef.current.value;

        this.setState({
            value: value
        });
    }
}