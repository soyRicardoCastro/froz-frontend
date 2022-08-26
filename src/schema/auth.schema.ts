import { object, string, TypeOf } from 'zod'

export const loginSchema = object({
  email: string({
    required_error: 'Email is required'
  }).email('Not a valid email'),
  password: string({
    required_error: 'Password is required'
  }).min(6, 'Password should be 6 chars minimun')
})

export const registerSchema = object({
  firstName: string({
    required_error: 'FirstName is required'
  }).min(1),
  lastName: string({
    required_error: 'LastName is required'
  }).min(1),
  gender: string({
    required_error: 'Gender is required'
  }).min(1),
  password: string({
    required_error: 'Password is required'
  }).min(6, 'Password too short - should be 6 chars minimum'),
  passwordConfirmation: string({
    required_error: 'Password confirmation is required'
  }),
  email: string({
    required_error: 'Email is required'
  }).email('Not a valid email'),
  address: string({
    required_error: 'Address is required'
  }),
  age: string({
    required_error: 'Age is required'
  }),
  phone: string({
    required_error: 'Phone is required'
  })
}).refine((data) => data.password === data.passwordConfirmation, {
  message: 'Passwords do not match',
  path: ['passwordConfirmation']
})

export type LoginInput = TypeOf<typeof loginSchema>

export type RegisterUserInput = TypeOf<typeof registerSchema>
