import { FunctionComponent, useEffect, useState } from "react";
import classes from './DateFilter.module.scss';

import DatePicker, { Day, DayRange, DayValue } from '@hassanmojab/react-modern-calendar-datepicker'

const DateFilter= (props) => {

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState({
        from: startDate,
        to: null
    });

    const [minimumDate, setMinimumDate] = useState();

    useEffect(() => {
        setEndDate({
            ...endDate,
            from: startDate
        })

        if (startDate) {
            props.setStartDate(new Date(startDate.year, startDate.month - 1, startDate.day))
            setMinimumDate({
                year: startDate.year,
                month: startDate.month,
                day: startDate.day
            })
        }

    }, [startDate])

    useEffect(() => {
        if (endDate.to) {
            props.setEndDate(new Date(endDate.to.year, endDate.to.month - 1, endDate.to.day))
        }
    }, [endDate]);

    const dateFormatter = (date) => {
        if (!date)
            return "Select"
        return `${('0' + date?.day).slice(-2)}.${('0' + date?.month).slice(-2)}.${date?.year}`;
    }

    const updateEndDate = (date) => {
        setEndDate({
            ...endDate,
            to: date.to
        })
    }


    return (<div className={classes.DateFilter}>
        <DatePicker
            inputClassName={classes.calendar}
            value={startDate}
            onChange={setStartDate}
            colorPrimary="#0C67FE"
            colorPrimaryLight="rgba(12, 103, 254, 0.1)"
            formatInputText={() => dateFormatter(startDate)}
            calendarClassName={classes.calendarItself}
        />
        <div className={classes.hyphen}>-</div>
        <DatePicker
            inputClassName={classes.calendar}
            value={endDate}
            onChange={updateEndDate}
            minimumDate={minimumDate}
            colorPrimary="#0C67FE"
            colorPrimaryLight="rgba(12, 103, 254, 0.1)"
            formatInputText={() => dateFormatter(endDate.to)}

        />
    </div>);
}

export default DateFilter;