import React, { Dispatch } from "react";

interface GlobalContextInterface {
  body: {
    monthIndex: number
    setMonthIndex: (s: any) => void
    smallCalendarMonth: number
    setSmallCalendarMonth: (s: any) => void
    daySelected: any
    setDaySelected: (s: any) => void
    showEventModal: boolean
    setShowEventModal: Dispatch<any>
    dispatchCalEvent: ({type, payload}: {type: any, payload: any}) => void
    savedEvents: Array<any>
    selectedEvent: any
    setSelectedEvent: Dispatch<any>
    setLabels: Dispatch<any>
    labels: Array<any>
    updateLabel: (s: any) => void
    filteredEvents: Array<any>
  }
}
 const initialState = {
  monthIndex: 0,
  setMonthIndex: (index: any) => {},
  smallCalendarMonth: 0,
  setSmallCalendarMonth: (index: any) => {},
  daySelected: null,
  setDaySelected: (day: any) => {},
  showEventModal: false,
  setShowEventModal: () => {},
  dispatchCalEvent: ({ type, payload }: { type: any, payload: any }) => {},
  savedEvents: [],
  selectedEvent: null,
  setSelectedEvent: () => {},
  setLabels: () => {},
  labels: [],
  updateLabel: () => {},
  filteredEvents: [],
}

const GlobalContext = React.createContext<GlobalContextInterface['body']>(initialState);

export default GlobalContext;
