import { NavLink } from 'react-router-dom'
import useStore from '../store'

export default function Navbar () {
  const { user } = useStore()

  return (
    <div className='flex h-16 z-10 fixed w-full justify-end py-3 px-6 bg-slate-800 space-x-6'>
      <div className='flex fixed z-20 items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg'>
        <NavLink to='/profile'>
          <p>
            <span className='text-gray-400 text-14'>Hi,</span>{' '}
            <span className='text-gray-400 font-bold ml-1 text-14'>
              {user?.firstName}
            </span>
          </p>
        </NavLink>
      </div>
    </div>
  )
}
