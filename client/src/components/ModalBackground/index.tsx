import React, { Component } from 'react';

import styles from './index.module.css';

class ModalBackground extends Component {
  render() {
    return (
      <div className={styles.container}>
        {this.props.children}
      </div>
    )
  }
}

export default ModalBackground;