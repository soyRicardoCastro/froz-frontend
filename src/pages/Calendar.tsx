import { useState, useEffect } from 'react'
import { getMonth } from '../utils'
import { CalendarHeader, Month, SidebarSchedule } from '../components/Schedule'
import { useCalendar } from '../store'

export default function Calendar() {
  const { monthIndex } = useCalendar()

  const [currentMonth, setCurrentMonth] = useState(getMonth())

  useEffect(() => setCurrentMonth(getMonth(monthIndex)), [monthIndex])
  return (
    <main className='h-screen flex flex-col'>
      <CalendarHeader />
      <div className='flex flex-1'>
        <SidebarSchedule />
        <Month month={currentMonth} />
      </div>
    </main>
  )
}
