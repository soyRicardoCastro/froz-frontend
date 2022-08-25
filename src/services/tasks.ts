import { AxiosResponse } from 'axios'
import axios from './axios'
import { Task } from '../types'

export const getTasks = async () => {
  const { data }: AxiosResponse<Array<Task['body']>> = await axios.get('/api/tasks')

  return data
}

export const getTask = async (id: string) => {
  const { data }: AxiosResponse<Task['body']> = await axios.get(`/api/tasks/${id}`)

  return data
}
