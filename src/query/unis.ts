import { useQuery } from 'react-query'
import { getUnis, getUni } from '../services/unis'

const key = 'unis'

export function useUnis() {
  return useQuery([key], getUnis)
}

export function useUni(id: string) {
  return useQuery([key, id], () => getUni(id))
}
