import React, { useState, useEffect } from 'react';
import moment, { Moment } from 'moment';
import { format } from 'date-fns';
import locale from 'date-fns/locale/en-US';
import Week from './Week';

interface DateHeadearType {
  key: string;
  value: Date;
}

interface CalendarBodyProps {
  YYMM: Moment;
  selected: string;
  dateHeaders: {
    weekDays: DateHeadearType[];
  };
  handleChangeSelected: (clicked: string) => void;
}

const CalendarBody = ({
  YYMM,
  selected,
  dateHeaders,
  handleChangeSelected,
}: CalendarBodyProps): React.ReactElement => {
  const [childYYMM, setChildYYMM] = useState(YYMM);
  const firstDayOfMonth = moment(childYYMM).startOf('month');

  useEffect(() => {
    setChildYYMM(YYMM);
  }, [YYMM]);

  const renderWeeksFunc = (
    selected: string,
    handleChange: (clicked: string) => void,
  ): JSX.Element[] => {
    const firstDateOfMonth = firstDayOfMonth.get('d');
    const firstDayOfWeek = firstDayOfMonth.clone().add('d', -firstDateOfMonth);
    const weekList = [];

    for (let i = 0; i < 6; i++) {
      weekList.push(
        <Week
          key={`calendar-week-${i}`}
          currentYYMM={firstDayOfMonth.format('YYYY-MM')}
          firstDayOfWeek={firstDayOfWeek
            .clone()
            .add('d', i * 7)
            .format('YYYY-MM-DD')}
          handleChange={handleChange}
          selected={selected}
        />,
      );
    }
    return weekList;
  };

  return (
    <div className="calendar-body__container">
      <table className="calendar-body__table">
        <thead className="calendar-date-header">
          <tr className="calendar-date-row">
            {dateHeaders.weekDays.map(({ key, value }: DateHeadearType) => {
              return (
                <th
                  className="calendar-date-component"
                  key={key}
                  data-testid="calendar-weekends"
                >
                  {format(value, 'E', { locale })}
                </th>
              );
            })}
          </tr>
        </thead>
      </table>
      {renderWeeksFunc(selected, handleChangeSelected)}
    </div>
  );
};

export default CalendarBody;
