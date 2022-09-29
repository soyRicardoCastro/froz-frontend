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
        <article className='border-t-4 border-blue-400 w-full justify-between h-56 bg-gray-500 flex flex-col p-4 rounded-xl'>
          <header className='bg-gradient-to-r from-cyan-500 to-blue-500 h-20 flex justify-center items-center'>
            <h3 className='tracking-wide text-xl text-white uppercase font-bold m-auto text-center'>program essentials</h3>
          </header>
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            </p> 
          </div>
          <footer className='flex justify-end align-center'>
            <Link to='/' className='text-xs px-3 py-2 bg-lime-400 rounded-xl'>Open module</Link>
          </footer>
        </article>

        <article className='border-t-4 border-blue-400 w-full justify-between h-56 bg-gray-500 flex flex-col p-4 rounded-xl'>
          <header className='bg-gradient-to-r from-cyan-500 to-blue-500 h-20 flex justify-center items-center'>
            <h3 className='tracking-wide text-xl text-white uppercase font-bold m-auto text-center'>program essentials</h3>
          </header>
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            </p> 
          </div>
          <footer className='flex justify-end align-center'>
            <Link to='/' className='text-xs px-3 py-2 bg-lime-400 rounded-xl'>Open module</Link>
          </footer>
        </article>

        <article className='border-t-4 border-blue-400 w-full justify-between h-56 bg-gray-500 flex flex-col p-4 rounded-xl'>
          <header className='bg-gradient-to-r from-cyan-500 to-blue-500 h-20 flex justify-center items-center'>
            <h3 className='tracking-wide text-xl text-white uppercase font-bold m-auto text-center'>program essentials</h3>
          </header>
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            </p> 
          </div>
          <footer className='flex justify-end align-center'>
            <Link to='/' className='text-xs px-3 py-2 bg-lime-400 rounded-xl'>Open module</Link>
          </footer>
        </article>

        <article className='border-t-4 border-blue-400 w-full justify-between h-56 bg-gray-500 flex flex-col p-4 rounded-xl'>
          <header className='bg-gradient-to-r from-cyan-500 to-blue-500 h-20 flex justify-center items-center'>
            <h3 className='tracking-wide text-xl text-white uppercase font-bold m-auto text-center'>program essentials</h3>
          </header>
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            </p> 
          </div>
          <footer className='flex justify-end align-center'>
            <Link to='/' className='text-xs px-3 py-2 bg-lime-400 rounded-xl'>Open module</Link>
          </footer>
        </article>


        {tasks?.map((task, i) => (
        <article key={task._id} className='border-t-4 border-blue-400 w-full justify-between h-56 bg-gray-500 flex flex-col p-4 rounded-xl'>
          <header className='bg-gradient-to-r from-cyan-500 to-blue-500 h-20 flex justify-center items-center'>
            <h3 className='tracking-wide text-xl text-white uppercase font-bold m-auto text-center'>{task.name}</h3>
          </header>
          <div>
            <p>
              {task.short.substring(0, 80)} 
            </p> 
          </div>
          <footer className='flex justify-end align-center'>
            <Link to={`/tasks/${task._id}`} className='text-xs px-3 py-2 bg-lime-400 rounded-xl'>Open module</Link>
          </footer>
        </article>
        ))}
      </div>
    </Layout>
  )
}

export default Tasks
