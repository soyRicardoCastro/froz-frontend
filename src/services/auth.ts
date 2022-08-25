import { AxiosResponse } from 'axios';
import { RegisterUserInput, LoginInput } from '../schema/auth.schema';
import { User } from '../types';
import axios from './axios'

export async function register(body: RegisterUserInput) {
  return await axios.post('/api/users', body)

}

export async function login(body: LoginInput) {
  const { data }: AxiosResponse<User['body']> = await axios.post('/api/login', body)

  return data
}
