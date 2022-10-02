import {
  useState,
  useEffect,
  useReducer,
  useMemo,
} from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";
import { User } from '../types'
import { AxiosResponse } from 'axios'
import axios from '../services/axios'
import useStore from '../store'
import { useUser } from '../query'

function savedEventsReducer(state: any, { type, payload }: { type: string, payload: any }) {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((evt: any) =>
        evt.id === payload.id ? payload : evt
      );
    case "delete":
      return state.filter((evt: any) => evt.id !== payload.id);
    default:
      throw new Error();
  }
}

export default function ContextWrapper({ children }: { children: JSX.Element | JSX.Element[] }) {
  const { user, setUser } = useStore()
  function initEvents() {
  //const storageEvents = localStorage.getItem("savedEvents");
  //const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  //console.log(parsedEvents)
    const events = user?.schedule ? user.schedule : []
    return events;
  }
  const id = user?._id as string
  const { data: userData, refetch } = useUser(id)
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState<any>(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [labels, setLabels] = useState<any>([]);
  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    [],
    initEvents
  );

  const filteredEvents = useMemo(() => {
    return savedEvents.filter((evt: any) =>
      labels
        .filter((lbl: any) => lbl.checked)
        .map((lbl: any) => lbl.label)
        .includes(evt.label)
    );
  }, [savedEvents, labels]);

  const updateSchedule = async () => {
    await axios.put(`/api/users/schedule/${user?._id}`, savedEvents)
    const { data }: AxiosResponse<User['body']> = await axios.get(`/api/users/${id}`)
    if (data) setUser(data)
    return
  }

  useEffect(() => {
    //localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
    updateSchedule()
  }, [savedEvents]);

  useEffect(() => {
    setLabels((prevLabels: Array<any>) => {
      return [...new Set(savedEvents.map((evt: any) => evt.label))].map(
        (label) => {
          const currentLabel = prevLabels.find(
            (lbl) => lbl.label === label
          );
          return {
            label,
            checked: currentLabel ? currentLabel.checked : true,
          };
        }
      );
    });
  }, [savedEvents]);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal]);

  function updateLabel(label: any) {
    setLabels(
      labels.map((lbl: any) => (lbl.label === label.label ? label : lbl))
    );
  }

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        dispatchCalEvent,
        selectedEvent,
        setSelectedEvent,
        savedEvents,
        setLabels,
        labels,
        updateLabel,
        filteredEvents,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
