import dayjs from "dayjs";
import React, { useContext } from "react";
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
      <img src={logo} alt="calendar" className="mr-2 w-12" />
      <h1 className="mr-10 text-xl text-gray-500 fond-bold">
        College Planer
      </h1>
      <button
        onClick={handleReset}
        className="border rounded py-2 px-4 mr-5"
      >
        Today
      </button>
      <button onClick={handlePrevMonth}>
        <ChevronLeftIcon className='text-gray-600 mx-2 h-5 w-5' />
      </button>
      <button onClick={handleNextMonth}>
        <ChevronRightIcon className='text-gray-600 mx-2 h-5 w-5' />
      </button>
      <h2 className="ml-4 text-xl text-gray-500 font-bold">
        {dayjs(new Date(dayjs().year(), monthIndex)).format(
          "MMMM YYYY"
        )}
      </h2>
    </header>
  );
}
