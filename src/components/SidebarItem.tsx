import { NavLink } from 'react-router-dom'

interface Props {
  body: {
    label: string
    path: string
    icon: JSX.Element
  }
}

export const SidebarItem = ({ label, path, icon }: Props['body']) => (
  <NavLink
    className='flex items-center px-6 py-2.5 bg-gray-500 text-gray-200 hover:bg-slate-400 hover:text-white group rounded-xl ml-2 mb-1 transition'
    to={path}
    style={({ isActive }) => ({
      backgroundColor: isActive ? 'bg-slate-800' : ''
    })}
  >
    {icon}
    <span className='hidden md:block'>{label}</span>
  </NavLink>
)
