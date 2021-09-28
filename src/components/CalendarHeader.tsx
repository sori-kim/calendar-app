import React, { useState, memo } from 'react';
import { Moment } from 'moment';
import SvgIcon from '../assets/svgs/SvgIcon';

interface HeaderProps {
  YYMM: Moment;
  moveMonth: (month: number) => void;
  text: string;
  setText: (YYMM: string) => void;
}

const CalendarHeader = ({
  YYMM,
  moveMonth,
  text,
  setText,
}: HeaderProps): React.ReactElement => {
  const [currentMonth, setCurrentMonth] = useState(YYMM.month());

  const handlePrevMonth = (): void => {
    moveMonth(-1);
    setText(YYMM.format('YYYY년 MM월'));
    setCurrentMonth((prev: number) => prev - 1);
  };

  const handleNextMonth = (): void => {
    moveMonth(+1);
    setText(YYMM.format('YYYY년 MM월'));
    setCurrentMonth((prev: number) => prev + 1);
  };

  return (
    <div className="calendar-header">
      <div className="calendar-header-top">
        <div className="calendar-header-nav">
          <SvgIcon name="arrowLeft" onClick={handlePrevMonth} />
          <div className="calendar-header-title">{text}</div>
          <SvgIcon
            name="arrowRight"
            onClick={handleNextMonth}
            // stroke="#000000"
          />
        </div>
      </div>
    </div>
  );
};

export default memo(CalendarHeader);
