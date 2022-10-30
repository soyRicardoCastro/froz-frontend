import dayjs from "dayjs";
import { Link } from 'react-router-dom'
import { useContext } from "react";
import logo from "../../assets/logo.png";
import GlobalContext from "../../context/GlobalContext";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'

export default function CalendarHeader() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  const handlePrevMonth = () => setMonthIndex(monthIndex - 1)
  const handleNextMonth = () => setMonthIndex(monthIndex + 1)
  const handleReset = () => setMonthIndex(
    monthIndex === dayjs().month()
      ? monthIndex + Math.random()
      : dayjs().month()
  )

  return (
    <header className="px-4 py-2 flex items-center">
      <Link to='/dashboard'>
      <img src={logo} alt="Froz enterprise logo" className="mr-2 w-28" />
      </Link>
      <h1 className="mr-10 text-xl text-gray-200 fond-bold">
        College Planer
      </h1>
      <button
        onClick={handleReset}
        className="border rounded py-2 px-4 mr-5 text-gray-200"
      >
        Today
      </button>
      <button onClick={handlePrevMonth}>
        <ChevronLeftIcon className='text-gray-200 mx-2 h-5 w-5' />
      </button>
      <button onClick={handleNextMonth}>
        <ChevronRightIcon className='text-gray-200 mx-2 h-5 w-5' />
      </button>
      <h2 className="ml-4 text-xl text-gray-300 font-bold">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </h2>
    </header>
  );
}
