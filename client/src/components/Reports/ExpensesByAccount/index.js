import React from 'react';
import moment from 'moment';
import { withResize } from 'utils/withResize';
import { BarChart, Bar, ResponsiveContainer, YAxis, XAxis, CartesianGrid, Tooltip } from 'recharts';
import { data } from 'data';
import AccountTooltip from './Tooltip';

import styles from './index.module.css';

class ExpensesByAccount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    }

    this.contentElement = null;

    this.refContentCallback = element => {
      this.contentElement = element;
    }

    this.amountTickFormatter = this.amountTickFormatter.bind(this);
  }

  componentDidMount() {
    let from = moment().startOf('month');
    let to = moment().endOf('month');

    from.subtract(6, 'months');

    data.reports.getExpensesByAccount(from, to).then((expenses) => {
      console.log(expenses);
      this.setState({
        data: expenses,
      });
    });
  }

  getReportSize() {
    let height = 600;
    let width = 400;

    if (this.contentElement) {
      const rect = this.contentElement.getBoundingClientRect();

      height = rect.height;
      width = rect.width;

      if (height < 800) {
        height = 800;
      }
    }

    return {
      width: `${width}px`,
      height: `${height}px`
    }
  }

  amountTickFormatter(tick) {
    return tick;
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.filter}>

        </div>
        <div className={styles.content} ref={this.refContentCallback}>
          <div className={styles.report} style={this.getReportSize()}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={this.state.data} layout="vertical" >
                <XAxis dataKey="total" type="number" tickFormatter={this.amountTickFormatter} />
                <YAxis dataKey="name" type="category" width={120} />
                <CartesianGrid strokeDasharray="5 5" />
                <Tooltip content={<AccountTooltip />} isAnimationActive={false} />
                <Bar
                  dataKey="total"
                  fill="#2196f3"
                  maxBarSize={10}
                  minPointSize={5}
                  legendType="none"
                  isAnimationActive={false}
                />
              </BarChart >
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    )
  }
}

export default withResize(ExpensesByAccount);