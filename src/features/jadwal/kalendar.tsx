import { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

type ValuePiece = Date | null

type Value = ValuePiece | [ValuePiece, ValuePiece]

export function Calendars() {
  const [value, onChange] = useState<Value>(new Date())

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
        calendarType="iso8601"
        defaultView="month"
        locale="id"
        className="custom-calendar rounded-2xl"
      />
    </div>
  )
}
