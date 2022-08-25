import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import useStore from '../store'
import axios from '../services/axios'
import { useTask } from '../query'
import { Layout } from '../components'

function Task() {
  const params = useParams()
  const id = params.id as string
  const { user } = useStore()
  const userId = user?._id

  const { data: task, error, isLoading, isFetching } = useTask(id)

  async function handleClick() {
    try {
      toast.info('Sending info...')
      await axios.post(`/api/users/${userId}/task`)
      toast.success('Nice, now you hace 1 task more completed')
    } catch (e: any) {
      toast.error('An error has ocurred :(')
      console.log(e)
    }
  }

  return (
    <Layout
      title={task?.name ? task.name : 'Task'}
      category="Users"
      error={error}
      isLoading={isLoading}
      isFetching={isFetching}
    >
      <div className="w-[90%] mx-auto h-full flex flex-col items-center justify-center">
        <div className="w-[600px] flex flex-wrap flex-col items-center justify-center">
          <h3 className="text-md font-semibold text-gray-200">
            Short Description: {task?.short}
          </h3>
          <br />
          <p className="m-5 w-[90%]">Full Task: {task?.description}</p>
        </div>
        <button
          className="px-5 py-2 my-10 rounded-full bg-lime-600 hover:bg-lime-200 transition"
          onClick={handleClick}
        >
          Done
        </button>
      </div>
    </Layout>
  )
}

export default Task
