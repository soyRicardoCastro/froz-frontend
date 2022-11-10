import { NavLink, useNavigate } from "react-router-dom"
import logo from '../assets/logo.png'
import { sidebarAdminRoutes, sidebarUserRoutes } from '../constants/routes'
import useStore from '../store'
import LogOutIcon from "./LogOutIcon"
import { SidebarItem } from './SidebarItem'


const Sidebar = () => {
  const { user } = useStore()
  const { removeUser } = useStore()
  const nav = useNavigate()
  
  const handleClick = () => {
    removeUser()
    nav('/')
  }
  
  return (
    <div className='relative w-[262px] bg-slate-800'>
      <div className='py-4 px-6'>
        <NavLink to='/'>
          <img src={logo} alt='Froz Enterprise Logo' />
        </NavLink>
      </div>

      <div className='mt-[15px] overflow-x-hidden h-[85vh] sm:w-20 md:w-60 pb-16 m-auto'>
        {user?.role.includes('admin') ? (
          sidebarAdminRoutes.map((item, i) => (
            <div key={`sidebar-item-${i}`} className='mr-2'>
              <h3 className='mx-6 overflow-hidden mb-2 text-xs text-gray-100 uppercase tracking-widest'>
                {item.title}
              </h3>
              <div>
                {item.links.map((link, i) => (
                  <SidebarItem
                    {...link}
                    key={`item-${i}`}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          sidebarUserRoutes.map((item, i) => (
            <div key={`sidebar-item-${i}`} className='mr-2'>
              <h3 className='mx-6 overflow-hidden mb-2 text-xs text-gray-100 uppercase tracking-widest'>
                {item.title}
              </h3>
              <div>
                {item.links.map((link, i) => (
                  <SidebarItem
                    key={`item-${i}`}
                    {...link}
                  />
                ))}
              </div>
            </div>
          ))
        )}
        <div>
          <button className='flex w-[220px] gap-2 items-center px-6 py-2.5 bg-gray-500 text-gray-200 hover:bg-slate-400 hover:text-white group rounded-xl ml-2 mb-1 transition' onClick={handleClick}>
            <LogOutIcon/>
            Log Out
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
