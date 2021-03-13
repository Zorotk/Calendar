import React, { Fragment, FC } from 'react';

import useCalendar, { Column } from '../hooks/useCalendar';

const Calendar: FC = () => {
  const { calendarRows, selectedDate, todayFormatted, daysShort, monthNames, getNextMonth, getPrevMonth } = useCalendar();
  const [selectDay, setSelectDay] = React.useState<string>('не выбрана');
  const dateClickHandler = (date: string) => {
    setSelectDay(date)   
  }

  return (
    <Fragment>
      <h3>Выбран месяц: {`${monthNames[selectedDate.getMonth()]} - ${selectedDate.getFullYear()}`}</h3>
      <h3>Выбрана дата: {selectDay}</h3>
      <table className="table">
        <thead>
          <tr>
            {daysShort.map(day => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            Object.values(calendarRows).map((cols: Column[]) => {
              return <tr key={cols[0].date}>
                {cols.map(col => (


                  col.date === todayFormatted

                    ? <td key={col.date} className={col.value === 6 || col.value === 7 ? `${col.classes} output` : `${col.classes} today`} onClick={() => dateClickHandler(col.date)}>
                      {col.value}
                    </td>
                    : <td key={col.date} className={col.value % 3 === 1 ? `${col.classes} output` : col.classes} onClick={() => dateClickHandler(col.date)}>{col.value}</td>
                ))}
              </tr>
            })
          }
        </tbody>
      </table>
      <div>
        <button className="calendar-button" onClick={getPrevMonth}>Прошлый</button>
        <button className="calendar-button" onClick={getNextMonth}>Следующий</button>
      </div>

    </Fragment>
  );
}

export default Calendar;