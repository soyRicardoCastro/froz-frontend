import { AxiosResponse } from 'axios'
import { University } from '../types'
import axios from './axios'

export async function getUnis () {
  const { data }: AxiosResponse<Array<University['body']>> = await axios.get('/api/unis')

  return data
}

export async function getUni (id: string) {
  const { data }: AxiosResponse<University['body']> = await axios.get(`/api/unis/${id}`)

  return data
}
