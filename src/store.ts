import create from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from './types'

import dayjs from 'dayjs'

interface Store {
  user: User['body'] | null
  setUser: (user: User['body']) => void
}

interface Calendar {
  monthIndex: number
  setMonthIndex: (idx: number) => void
  
}

const useCalendar = create<Calendar>((set) => ({
  monthIndex: dayjs().month(),
  setMonthIndex: (idx: number) => set({ monthIndex: dayjs(idx).month() }),
}))


const useStore = create<Store>()(
  persist((set) => ({
    user: null,
    setUser: (user: User['body']) => set({ user: user })
  }),
  {
    name: 'user-storage'
  })
)

export default useStore

export { useCalendar }