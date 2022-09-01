export interface Career {
  name: string
}

export interface Coach {
  name: string
  contact?: string
}

export interface CareerFromDB {
  _id: string
  name: string
  createdAt: Date
  updatedAt: Date
  __v: number
}

interface CoachFromDB {
  _id?: string
  name: string
  contact?: string
  createdAt?: Date
  updatedAt?: Date
  __v?: number
}

export interface CreateUniForm {
  name: string
  state: string
  division: string
  careers: Career[]
  coachs: Coach[]
}

export interface University {
  body: {
    _id: string
    name: string
    state: string
    careers: CareerFromDB[]
    division: string
    coachs: CoachFromDB[]
    createdAt: Date
    updatedAt: Date
    __v: number
  }
}

type Role = 'user' | 'admin' | 'dev' | 'agent'

export interface User {
  body: {
    _id: string
    firstName: string
    lastName: string
    age: string
    email: string
    phone: string
    address: string
    gender: string
    universities?: Array<University['body']>
    completedTask: number
    role: Role[]
    createdAt: Date
    updatedAt: Date
    __v: number
  }
}

interface Task {
  body: {
    _id: string
    name: string
    short: string
    description: string
    createdAt: Date
    updatedAt: Date
    __v: number
  }
}

interface UserTask {
  body: {
    _id: string
    user: User
    task: Task
    createdAt: Date
    updatedAt: Date
  }
}

// * Types for table sorting
export type UniKeys = keyof University['body']
export type UserKeys = keyof User['body']

export type SortOrder = 'ascn' | 'desc'
