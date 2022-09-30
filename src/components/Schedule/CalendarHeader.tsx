import dayjs from 'dayjs'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import { useCalendar } from '../../store'
import logo from '../../assets/logo.png'

export default function CalendarHeader () {
  const { monthIndex, setMonthIndex } = useCalendar()

  const handleReset = () => setMonthIndex(dayjs().month())
  const handleNextMonth = () => setMonthIndex(monthIndex + 1)
  const handlePrevMonth = () => setMonthIndex(monthIndex - 1)

  return (
    <header className='px-4 py-2 flex items-center'>
      <img src={logo} alt="Froz enterprise logo" className='mr-4 w-20' />

      <h1 className='mr-10 text-xl text-gray-300 font-bold'>
        My College Planer
      </h1>

      <button onClick={handleReset} className='border rounded py-2 px-4 mr-5'>
        Today
      </button>

      <button onClick={handlePrevMonth}>
        <ChevronLeftIcon className='w-5 h-5 text-gray-400 mx-2' />
      </button>

      <button onClick={handleNextMonth}>
        <ChevronRightIcon className='w-5 h-5 text-gray-400 mx-2' />
      </button>

      <h2 className=''>
        {dayjs(new Date(dayjs().year(), monthIndex)).format('MMMM YYYY')}
      </h2>
    </header>
  )
}
