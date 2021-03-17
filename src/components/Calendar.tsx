
import React, { useState, FC } from 'react';

import useCalendar, { Column } from '../hooks/useCalendar';

const Calendar: FC = () => {
  const { calendarRows, selectedDate, todayFormatted, daysShort, monthNames, getNextMonth, getPrevMonth } = useCalendar();
  const [selectDay, setSelectDay] = useState<string | number>('не выбрана');
  const [choiceType, setchoiceType] = useState('start')
  const [startDate, setstartDate] = useState<number | null>(null)
  const [endDate, setendDate] = useState<number | null>(null)
  const [hover, setHover] = React.useState<number>(1);
  function dayDeference() {
    if (endDate && startDate) {
      return endDate - startDate + 1
    }
  }
  const dateClickHandler = (dates: string) => {
    const date = Number(dates.split('-')[0])

    setSelectDay(date)
    if (startDate && date < Number(startDate)) {
      setstartDate(date)
      return setchoiceType('end')
    }
    if (endDate && date > endDate) {
      setendDate(date)
      return setchoiceType('end')
    }


    if (choiceType === 'start') {
      setstartDate(date)
      return setchoiceType('end')
    }
    else {
      setendDate(date)
    }

  }
  function checkBetween(day: number) {
    // if (!startDate || !endDate) { return false }
    // return day > Number(startDate) && day < Number(endDate)

    if (startDate && !endDate) { return day > startDate && day < hover }
    return day > Number(startDate) && day < Number(endDate)
  }
  return (
    <>
      <h3>Выбран месяц: {`${monthNames[selectedDate.getMonth()]} - ${selectedDate.getFullYear()}`}</h3>
      <h3>Выбрана дата: {selectDay}</h3>
      <div className='panel-button-select'>
        <div onClick={() => setchoiceType('start')}>Начало: {startDate}</div>
        <div onClick={() => setchoiceType('end')}>Конец: {endDate}</div>
      </div>
      <h2>Итого дней {dayDeference()}</h2>
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
                {cols.map(col => {
                  const selected = col.value === Number(startDate) || col.value === Number(endDate)

                  let between = checkBetween(col.value)
                  if (col.date === todayFormatted) {
                    return <td key={col.date} className={`${col.classes} today`} onClick={() => dateClickHandler(col.date)}>
                      {col.value}
                    </td>
                  }

                  const className = [
                    col.classes,
                    selected ? '' : `select`,
                    between ? `selected` : ''].join(' ')

                  return <td key={col.date} className={className}

                    onMouseOver={() => setHover(Number(col.date.split('-')[0]))}
                    onClick={() => dateClickHandler(col.date)
                    }>{col.value}</td>
                })}
              </tr>
            })
          }
        </tbody>
      </table>
      <div>
        <button className="calendar-button" onClick={getPrevMonth}>Прошлый</button>
        <button className="calendar-button" onClick={getNextMonth}>Следующий</button>
      </div>

    </>
  );
}

export default Calendar;