import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Layout } from '../components'
import { zodResolver } from '@hookform/resolvers/zod'
import { taskSchema, TaskInput } from '../schema/task.schema'
import { toast } from 'react-toastify'
import axios from '../services/axios'

function CreateTask() {
  const [createTaskError, setCreateTaskError] = useState<any | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TaskInput>({
    resolver: zodResolver(taskSchema),
  })

  const onSubmit = async (values: TaskInput) => {
    try {
      setLoading(true)
      toast.info('Sending info...')
      await axios.post('/api/tasks', values)
      toast.success('Task created successfully')
      setLoading(false)
    } catch (e: any) {
      console.log(e)
      toast.error('Internal server error')
      toast.error(e)
      setCreateTaskError(e)
      setLoading(false)
    }
  }

  return (
    <Layout title="Create Task" category="Admin">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center mx-auto max-w-sm gap-3"
      >
        {createTaskError && (
          <p className="text-red-500 text-sm text-center">{createTaskError}</p>
        )}
        <input
          className="w-full border-none bg-slate-900 text-white py-2 px-5 rounded-xl outline-none focus:outline-none"
          placeholder="Task Name"
          type="text"
          {...register('name')}
        />
        <p className="text-red-500 text-sm text-center">
          {errors.name?.message}
        </p>

        <input
          className="w-full border-none bg-slate-900 text-white py-2 px-5 rounded-xl outline-none focus:outline-none"
          placeholder="Short description"
          type="text"
          {...register('short')}
        />
        <p className="text-red-500 text-sm text-center">
          {errors.short?.message}
        </p>
        <textarea
          className="w-full border-none bg-slate-900 text-white py-2 px-5 rounded-xl outline-none focus:outline-none h-[150px]"
          placeholder="Task Description"
          {...register('description')}
        />
        <p className="text-red-500 text-sm text-center">
          {errors.description?.message}
        </p>
        {loading ? (
          <button disabled className="py-3 px-5 bg-lime-300 rounded-full">
            Loading...
          </button>
        ) : (
          <button
            type="submit"
            className="py-3 px-5 bg-lime-500 rounded-full hover:bg-lime-600 transition"
          >
            Create Task
          </button>
        )}
      </form>
    </Layout>
  )
}

export default CreateTask
