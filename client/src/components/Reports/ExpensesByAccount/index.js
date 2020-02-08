import React from 'react';
import moment from 'moment';
import { BarChart, Bar, ResponsiveContainer, YAxis, XAxis, CartesianGrid, Tooltip } from 'recharts';
import Data from '../../../data/Data.js';
import AccountTooltip from './Tooltip';

import styles from './index.module.css';

export default class ExpensesByAccount extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            width: 600,
            height: 400
        }

        this.contentElement = null;

        this.refContentCallback = element => {
            this.contentElement = element;
            this.calculateReportPosition();
        }

        this.data = new Data();

        this.updateDimensions = this.updateDimensions.bind(this);
        this.amountTickFormatter = this.amountTickFormatter.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);

        let from = moment().startOf('month');
        let to = moment().endOf('month');

        from.subtract(6, 'months');

        this.data.reports.getExpensesByAccount(from, to).then((expenses) => {
            console.log(expenses);
            this.setState({
                data: expenses,
            });
        });
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    calculateReportPosition() {
        if (this.contentElement) {
            const rect = this.contentElement.getBoundingClientRect();
            let height = rect.height;

            if (height < 800) {
                height = 800;
            }

            this.setState({
                width: rect.width,
                height: height
            });
        }
    }

    updateDimensions() {
        this.calculateReportPosition();
    }

    amountTickFormatter(tick) {
        return tick;
    }

    render() {
        const reportStyle = {
            width: `${this.state.width}px`,
            height: `${this.state.height}px`
        }

        return (
            <div className={styles.container}>
                <div className={styles.filter}>

                </div>
                <div className={styles.content} ref={this.refContentCallback}>
                    <div className={styles.report} style={reportStyle}>
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