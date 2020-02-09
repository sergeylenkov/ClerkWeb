import React from 'react';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';

import 'rc-calendar/assets/index.css';

import styles from './index.module.css';

export const DatePickerPeriod = {
    Week: 0,
    Month: 1,
    PreviousMonth: 2,
    Year: 3,
    PreviousYear: 4,
    Custom: 5
}

const DatePickerButtons = [
    {
        period: DatePickerPeriod.Week,
        name: 'Week'
    },
    {
        period: DatePickerPeriod.Month,
        name: 'Month'
    },
    {
        period: DatePickerPeriod.PreviousMonth,
        name: 'Previous Month'
    },
    {
        period: DatePickerPeriod.Year,
        name: 'Year'
    },
    {
        period: DatePickerPeriod.PreviousYear,
        name: 'Previous Year'
    },
    {
        period: DatePickerPeriod.Custom,
        name: 'Custom'
    }
]

export default class DatePicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedPeriod: this.props.selectedPeriod
        }

        this.onChange = this.onChange.bind(this);
        this.onPeriodChange = this.onPeriodChange.bind(this);
    }

    onChange() {
        this.setState({
            selectedPeriod: DatePickerPeriod.Custom
        })
    }

    onPeriodChange(period) {
        this.setState({
            selectedPeriod: period
        })
    }

    render() {
        const buttons = DatePickerButtons.filter(button => {
            return this.props.periods.includes(button.period);
        });

        return (
            <div className={`${styles.container} ${this.props.className}`}>
                <div className={styles.periods}>
                {
                    buttons.map(item => {
                        const isSelected = item.period === this.state.selectedPeriod;
                        return <div
                                    key={item.period}
                                    className={`${styles.periodButton} ${isSelected ? styles.selected : ''}`}
                                    onClick={() => this.onPeriodChange(item.period)}
                                >
                                    {item.name}
                                </div>
                    })
                }
                </div>
                <div className={styles.calendar}>
                    <RangeCalendar
                        className={styles.rangeCalendar}
                        onChange={this.onChange}
                    />
                </div>
            </div>
        )
    }
}