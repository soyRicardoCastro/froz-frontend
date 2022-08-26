import useStore from '../store'
import { Layout } from '../components'
import avatar from '../assets/avatar.svg'

function Profile () {
  const { user } = useStore()

  return (
    <Layout title='Profile' category='User'>
      <div className='flex items-center justify-center flex-col gap-5'>
        <img
          src={avatar}
          className='sm:w-16 sm:h-16 md:w-32 md:h-32 rounded-full'
          alt={`Avatar of ${user?.firstName} ${user?.lastName}`}
        />
        <div className='w-4/5 mx-auto gap-2 flex flex-col items-center'>
          <h2 className='text-3xl text-white capitalize'>{`${user?.firstName} ${user?.lastName}`}</h2>
          <div className='text-xl font-semibold text-gray-400 capitalize'>
            {user?.role.map((role) => (
              <p key={role} className='capitalize'>
                {role}{' '}
              </p>
            ))}
          </div>
          <p className='text-md text-gray-200'>
            <span className='font-semibold'>Email: </span> {user?.email} |{' '}
            <span className='font-semibold'>Phone: </span>
            {user?.phone}
          </p>
          <p className='text-md text-gray-300'>
            <span className='font-semibold'>Gender: </span>
            {user?.gender}
          </p>
          <p className='text-md text-gray-300'>
            <span className='font-semibold'>Address: </span>
            {user?.address}
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default Profile
