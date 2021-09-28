import React, { useState } from 'react';
import moment from 'moment';
import useCalendar from '@veccu/react-calendar';
import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';

const Calendar = (): React.ReactElement => {
  const [YYMM, setYYMM] = useState(moment());
  const [selected, setSelected] = useState(moment().format('YYYY-MM-DD'));
  const { headers } = useCalendar();

  const [text, setText] = useState(YYMM.format('YYYY년 MM월'));

  const moveMonth = (month: number): void => {
    setYYMM(YYMM.add(month, 'M'));
  };

  const handleChangeSelected = (clickedDate: string): void => {
    setSelected(clickedDate);

    if (moment(clickedDate).isBefore(YYMM, 'month')) {
      moveMonth(-1);
    } else if (moment(clickedDate).isAfter(YYMM, 'month')) {
      moveMonth(1);
    }
  };

  return (
    <section className="calendar-app__layout">
      <div className="calendar-container">
        <CalendarHeader
          YYMM={YYMM}
          moveMonth={moveMonth}
          text={text}
          setText={setText}
        />
        <div className="calendar-body">
          <CalendarBody
            YYMM={YYMM}
            selected={selected}
            dateHeaders={headers}
            handleChangeSelected={handleChangeSelected}
          />
        </div>
      </div>
    </section>
  );
};

export default Calendar;
