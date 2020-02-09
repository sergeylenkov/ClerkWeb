import React from 'react';
import moment from 'moment';
import { LineChart, Line, ResponsiveContainer, Tooltip, YAxis, XAxis, CartesianGrid } from 'recharts';
import Data from '../../../data/Data.js';
import ExpensesTooltip from './Tooltip';
import DatePicker, { DatePickerPeriod } from '../../DatePicker';

import styles from './index.module.css';

export default class ExpensesByMonth extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            width: 600,
            height: 400,
            isDatePickerVisible: false,
            selectedPeriod: DatePickerPeriod.Year
        }

        this.contentElement = null;

        this.refContentCallback = element => {
            this.contentElement = element;
            this.calculateReportPosition();
        }

        this.data = new Data();
        this.periods = [DatePickerPeriod.Year, DatePickerPeriod.PreviousYear, DatePickerPeriod.Custom];

        this.updateDimensions = this.updateDimensions.bind(this);
        this.onToggleDatePicker = this.onToggleDatePicker.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);

        let from = moment().startOf('month');
        let to = moment().endOf('month');

        from.subtract(6, 'months');

        this.data.reports.getExpensesByMonth(from, to).then((expenses) => {
            console.log(expenses);
            expenses.forEach(item => {
                item.date = moment(item.date);
                const date = item.date;

                if (date.year() === moment().year()) {
                    item.formattedDate = date.format('MMM');
                } else {
                    item.formattedDate = date.format('MMM YYYY');
                }
            });

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

            if (height < 600) {
                height = 600;
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

    onToggleDatePicker() {
        this.setState({
            isDatePickerVisible: !this.state.isDatePickerVisible
        });
    }

    render() {
        const reportStyle = {
            width: `${this.state.width}px`,
            height: `${this.state.height}px`
        }

        return (
            <div className={styles.container}>
                <div className={styles.filter}>
                    <div className={styles.periodButton} onClick={this.onToggleDatePicker}>Month</div>
                    {
                        this.state.isDatePickerVisible &&
                        <DatePicker
                            className={styles.datePicker}
                            periods={this.periods}
                            selectedPeriod={this.state.selectedPeriod}
                        />
                    }
                </div>
                <div className={styles.content} ref={this.refContentCallback}>
                    <div className={styles.report} style={reportStyle}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={this.state.data}>
                                <Tooltip content={<ExpensesTooltip />} isAnimationActive={false} />
                                <XAxis dataKey="formattedDate" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="5 5" />
                                <Line dataKey="total" stroke="#2196f3" isAnimationActive={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        )
    }
}