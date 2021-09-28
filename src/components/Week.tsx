import React, { useState, useEffect } from 'react';
import moment from 'moment';

interface WeekProps {
  currentYYMM: string;
  firstDayOfWeek: string;
  handleChange: (clicked: string) => void;
  selected: string;
}

interface DayInfo {
  YYMMDD: string;
  getDay: string;
  isHoliday: boolean;
  key: number;
}

interface DayProps {
  daysList: DayInfo[];
  currentYYMM: string;
  handleChange: (clicked: string) => void;
  selected: string;
}

const Week = ({
  currentYYMM,
  firstDayOfWeek,
  handleChange,
  selected,
}: WeekProps) => {
  const [selectedDate, setSelectedDate] = useState(selected);

  useEffect(() => {
    setSelectedDate(selected);
  }, [selected]);

  // 매주 첫번째 날을 인자로 받아서 일주일의 배열을 생성하는 함수
  const Days = (firstDayOfWeek: string | undefined) => {
    const daysList = [];

    for (let i = 0; i < 7; i++) {
      const Day = moment(firstDayOfWeek).add('d', i);
      daysList.push({
        YYMMDD: Day.format('YYYY-MM-DD'),
        getDay: Day.format('D'),
        isHoliday: false,
        key: Math.random(),
      });
    }

    return daysList;
  };

  // 일주일의 배열을 받아서 컴포넌트로 전환하는 함수
  const mapDaysToComponents = ({
    daysList,
    currentYYMM,
    handleChange,
    selected,
  }: DayProps) => {
    const thisMonth = moment(currentYYMM);

    return daysList.map((dayInfo: DayInfo, i: number) => {
      let className = 'date-weekday-label';

      if (!thisMonth.isSame(dayInfo.YYMMDD, 'month')) {
        className = 'date-notThisMonth';
      } else if (i === 0) {
        className = 'date-sun';
      } else if (i === 6) {
        className = 'date-sat';
      }
      if (moment(dayInfo.YYMMDD).isSame(selected, 'day')) {
        className = 'selected';
      }

      return (
        <div
          className={`calendar-day ${className}`}
          onClick={() => {
            handleChange(dayInfo.YYMMDD);
          }}
          key={Math.random()}
        >
          <label className="calendar-day-label">{dayInfo.getDay}</label>
        </div>
      );
    });
  };

  const daysList = Days(firstDayOfWeek);

  return (
    <div className="calendar-week">
      {mapDaysToComponents({
        daysList,
        currentYYMM,
        handleChange,
        selected,
      })}
    </div>
  );
};

export default Week;
