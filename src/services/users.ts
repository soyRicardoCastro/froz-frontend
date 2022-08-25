import { AxiosResponse } from 'axios'
import { User } from '../types'
import axios from './axios'

export async function getUsers() {
  const { data }: AxiosResponse<User['body'][]> = await axios.get('/api/users')

  return data
}

export async function getUser(id: string) {
  const { data }: AxiosResponse<User['body']> = await axios.get(`/api/users/${id}`)

  return data
}
