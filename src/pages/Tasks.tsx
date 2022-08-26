import { Link } from 'react-router-dom'
import { useTasks } from '../query'
import { Layout } from '../components'

function Tasks () {
  const { data: tasks, isLoading, isFetching, error } = useTasks()

  return (
    <Layout
      title='Tasks List'
      category='Users'
      isLoading={isLoading}
      isFetching={isFetching}
      error={error}
    >
      <div className='w-11/12 mx-auto grid grid-cols-2 gap-1'>
        {tasks?.map((task, i) => (
          <div
            className='w-full h-36 gap-1 flex flex-col bg-gray-500 p-4 overflow-hidden rounded-md'
            key={i}
          >
            <p className='text-md text-gray-200'>{task.name}</p>
            <p className='text-xs text-gray-300'>
              {task.short.substring(0, 80)}
            </p>
            <Link to={`/tasks/${task._id}`}>
              <button className='py-2 px-4 rounded-full text-white bg-lime-500'>
                Read more
              </button>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default Tasks
