import React, { Component } from 'react';

import styles from './index.module.css';

class PrimaryButton extends Component {
    render() {
        return (
            <button className={styles.container}>
                {this.props.children}
            </button>
        )
    }
}

export default PrimaryButton;