import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useStore from '../store'
import { Role } from '../types'

interface Props {
  body: {
    allowedRoles: Array<Role>
  }
}

const RequireAuth = ({ allowedRoles }: Props['body']) => {
  const { user } = useStore()
  const location = useLocation()

  return (
    user?.role.find((role: Role) => allowedRoles?.includes(role))
      ? <Outlet />
      : user
        ? <Navigate to='/unauthorized' state={{ from: location }} replace />
        : <Navigate to='/login' state={{ from: location }} replace />
  )
}

export default RequireAuth
