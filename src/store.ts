import create from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from './types'

interface Store {
  user: User['body'] | null
  setUser: (user: User['body']) => void
  removeUser: () => void
}

const useStore = create<Store>()(
  persist((set) => ({
    user: null,
    setUser: (user: User['body']) => set({ user: user }),
    removeUser: () => set({ user: null })
  }),
  {
    name: 'user-storage'
  })
)

export default useStore

