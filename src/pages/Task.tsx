import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useStore from '../store'
import axios from '../services/axios'
import { useTask } from '../query'
import { Layout } from '../components'

function Task () {
  const params = useParams()
  const id = params.id as string
  const { user } = useStore()

  const nav = useNavigate()

  const { data: task, error, isLoading, isFetching } = useTask(id)

    if (!task) {
      toast.warn('Task not found')
      return nav('/tasks')
    }

  const handleClick = async (id: string) => {  
    await toast.promise(async () => await axios.delete(`/api/tasks/${id}`), {
      pending: 'Sending info',
      error: 'Error',
      success: 'Deleted Successfully'
    })
    nav('/tasks')
  }

  return (
    <Layout
      title={task.name}
      category='Users'
      error={error}
      isLoading={isLoading}
      isFetching={isFetching}
    >
      <div className='w-[90%] mx-auto h-full flex flex-col items-center justify-center'>
        <div className='w-full m-auto flex flex-col items-center justify-center'>
          <h3 className='text-md font-semibold text-gray-200'>
            Short Description: {task.short}
          </h3>
          <br />
          <p className='m-5 w-[90%]'>{task.description}</p>
        </div>

      {user?.role.includes('admin') && (
        <button onClick={() => handleClick(task._id)} className='py-2 px-3 rounded-xl bg-lime-500'>Delete</button>
      )}
      </div>
    </Layout>
  )
}

export default Task
