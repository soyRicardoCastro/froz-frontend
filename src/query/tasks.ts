import { useQuery } from 'react-query'
import { getTasks, getTask } from '../services/tasks'

const key = 'tasks'

export function useTasks() {
  return useQuery([key], getTasks)
}

export function useTask(id: string) {
  return useQuery([key, id], () => getTask(id))
}
