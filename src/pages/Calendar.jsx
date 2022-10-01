import React, { useState, useContext, useEffect } from "react";
import ContextWrapper from "../context/ContextWrapper";
import { getMonth } from "../utils";
import CalendarHeader from "../components/calendar/CalendarHeader";
import Sidebar from "../components/calendar/Sidebar";
import Month from "../components/calendar/Month";
import GlobalContext from "../context/GlobalContext";
import EventModal from "../components/calendar/EventModal";
function Calendar () {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
    console.log(showEventModal)
  }, [monthIndex, showEventModal]);

  return (
    <React.Fragment>
      <ContextWrapper>
      {showEventModal && <EventModal />}

      <div className="h-screen flex flex-col">
        <CalendarHeader />
        <div className="flex flex-1">
          <Sidebar />
          <Month month={currenMonth} />
        </div>
      </div>
      </ContextWrapper>
    </React.Fragment>
  );
}

export default Calendar;

