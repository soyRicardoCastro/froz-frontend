import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useStore from '../store'
import { Role } from '../types'

interface Props {
  body: {
    allowedRoles: Role[]
  }
}

const RequireAuth = ({ allowedRoles }: Props['body']) => {
  const { user } = useStore()
  const location = useLocation()

  if (!user) return <Navigate to='/login' state={{ from: location }} replace />

  return (
    user.role.find((role: Role) => allowedRoles.includes(role))
      ? <Outlet />
      : <Navigate to='/unauthorized' state={{ from: location }} replace />
  )
}

export default RequireAuth
