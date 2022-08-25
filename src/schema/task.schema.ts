import { object, string, TypeOf } from 'zod'

export const taskSchema = object({
  name: string({
    required_error: 'Name is required'
  }),
  short: string({
    required_error: 'Short description is required'
  }).max(80, 'Max 80 characters'),
  description: string({
    required_error: 'Complete description is required'
  })
})

export type TaskInput = TypeOf<typeof taskSchema>
