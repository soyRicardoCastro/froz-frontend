import create from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from './types'

interface Store {
  user: User['body'] | null
  setUser: (user: User['body']) => void
}

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
