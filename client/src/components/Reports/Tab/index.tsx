import React, { Component } from 'react';

import styles from './index.module.css';

interface ReportTabProps {
  value: number;
  title: string;
  isSelected: boolean;
  onClick: (value: number) => void;
}

class ReportTab extends Component<ReportTabProps> {
  constructor(props: ReportTabProps) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onClick(this.props.value);
  }

  render() {
    return (
      <button
        className={`${styles.container} ${
          this.props.isSelected ? styles.selected : ''
        }`}
        onClick={this.onClick}
      >
        <div className={styles.label}>{this.props.title}</div>
      </button>
    );
  }
}

export default ReportTab;