import React from 'react';
import moment from 'moment';
import { withResize } from 'components/Utils/withResize';
import { LineChart, Line, ResponsiveContainer, Tooltip, YAxis, XAxis, CartesianGrid } from 'recharts';
import Data from 'data/Data.js';
import ExpensesTooltip from './Tooltip';
import DatePicker, { DatePickerPeriod } from 'components/DatePicker';

import styles from './index.module.css';

class ExpensesByMonth extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isDatePickerVisible: false,
            selectedPeriod: DatePickerPeriod.Year
        }

        this.contentElement = null;

        this.refContentCallback = element => {
            this.contentElement = element;
        }

        this.data = new Data();
        this.periods = [DatePickerPeriod.Year, DatePickerPeriod.PreviousYear, DatePickerPeriod.Custom];

        this.onToggleDatePicker = this.onToggleDatePicker.bind(this);
    }

    componentDidMount() {
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

    getReportSize() {
        let height = 600;
        let width = 400;

        if (this.contentElement) {
            const rect = this.contentElement.getBoundingClientRect();

            height = rect.height;
            width = rect.width;

            if (height < 600) {
                height = 600;
            }
        }

        return {
            width: `${width}px`,
            height: `${height}px`
        }
    }

    onToggleDatePicker() {
        this.setState({
            isDatePickerVisible: !this.state.isDatePickerVisible
        });
    }

    render() {
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
                    <div className={styles.report} style={this.getReportSize()}>
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

export default withResize(ExpensesByMonth);