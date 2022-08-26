import { Layout } from '../components'
import useStore from '../store'
import { Link } from 'react-router-dom'
import {
  AcademicCapIcon,
  LibraryIcon,
  MailIcon,
  ArchiveIcon
} from '@heroicons/react/outline'

const Dashboard = () => {
  const { user } = useStore()

  return (
    <Layout title={`Welcome back ${user?.firstName}`} category='User'>
      <div className='w-[90%] mx-auto gap-3 h-full grid grid-cols-2'>
        <div className='h-[220px] shadow-lg rounded-2xl w-full flex flex-col gap-2 bg-slate-500 p-5'>
          <h2 className='text-3xl text-white'>
            {user?.firstName} {user?.lastName}
          </h2>
          <small className='text-md text-gray-300'>{user?.email}</small>
          <small className='text-md text-gray-300'>{user?.phone}</small>
          <p className='text-md text-gray-400'>{user?.address}</p>
        </div>
        <div className='h-[230px] overflow-hidden shadow-lg rounded-2xl bg-slate-500 w-full p-3'>
          <h4 className='text-sm font-bold text-center text-white m-[2px]'>
            My Universities
          </h4>
          <ul className='gap-1'>
            {user?.universities?.map((u, i) => (
              <li key={i} className='m-0 p-1'>
                {i + 1}. {u.name}
              </li>
            ))}
          </ul>
        </div>
        <div className='h-[100px] w-full p-4 rounded-md bg-yellow-400 flex items-center justify-start text-2xl font-bold text-white hover:cursor-pointer'>
          <AcademicCapIcon className='h-[60px] w-[60px] text-white' />
          <Link to='/unis' className='text-white'>Universities</Link>
        </div>
        <div className='h-[100px] w-full p-4 rounded-md bg-blue-600 flex items-center justify-start text-2xl font-bold text-white hover:cursor-pointer'>
          <MailIcon className='h-[60px] w-[60px] text-white' />
          <Link to='/sendMessages' className='text-white'>Contact a University</Link>
        </div>
        <div className='h-[100px] w-full p-4 rounded-md bg-green-400 flex items-center justify-start text-2xl font-bold text-white hover:cursor-pointer'>
          <LibraryIcon className='h-[60px] w-[60px] text-white' />
          <Link to='/user/unis' className='text-white'>My Universities</Link>
        </div>
        <div className='h-[100px] w-full p-4 rounded-md bg-red-400 flex items-center justify-start text-2xl font-bold text-white hover:cursor-pointer'>
          <ArchiveIcon className='h-[60px] w-[60px] text-white' />
          <Link to='/tasks' className='text-white'>Tasks</Link>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
