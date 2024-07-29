import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateRangePicker = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [inputActive, setInputActive] = useState(
      {  firstInput:false,
        secoundInput:false
      }

    );

    return (
        <div className="date-range-picker">
            <div className="date-picker">
                <label>From</label>
                <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="start date"
                    className={inputActive ? 'date-picker-input-active1' : 'date-picker-input1'}
                    onFocus={() => setInputActive({...inputActive, firstInput:true})}
                    onBlur={() => setInputActive({...inputActive, firstInput:false})}
                />
            </div>
            <div className="date-picker">
                <label>To</label>
                <DatePicker
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    placeholderText="end date"
                    className={inputActive ? 'date-picker-input-active2' : 'date-picker-input2'}
                    onFocus={() => setInputActive({...inputActive,secoundInput:true})}
                    onBlur={() => setInputActive({...inputActive,secoundInput:false})}

                    

                />
            </div>
        </div>
    );
};

export default DateRangePicker;
