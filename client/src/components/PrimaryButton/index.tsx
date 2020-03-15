import React, { Component } from 'react';

import styles from './index.module.css';

interface PrimaryButtonProps {
  type: any;
}

class PrimaryButton extends Component<PrimaryButtonProps> {
  render() {
    return (
      <button className={styles.container} {...this.props}>
        {this.props.children}
      </button>
    )
  }
}

export default PrimaryButton;