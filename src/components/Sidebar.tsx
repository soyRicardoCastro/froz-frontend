import { NavLink } from "react-router-dom"
import useStore from '../store'
import { SidebarItem } from './SidebarItem'
import { sidebarAdminRoutes, sidebarUserRoutes } from '../constants/routes'
import logo from '../assets/logo.png'

const Sidebar = () => {
  const { user } = useStore()

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
      </div>
    </div>
  )
}

export default Sidebar
