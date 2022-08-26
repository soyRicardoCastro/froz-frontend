import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'

function Unauthorized () {
  return (
    <section className='h-screen bg-cover'>
      <div className='flex h-full w-full items-center justify-center container mx-auto px-8'>
        <div className='max-w-2xl text-center flex flex-col items-center justify-center'>
          <img src={logo} alt='Froz Logo' className='mb-6' />
          <h1 className='text-3xl sm:text-5xl tracking-widest text-white lg:text-7xl uppercase'>
            You are not authorized
          </h1>

          <p className='mt-6 lg:text-lg text-white'>Please go to other section</p>
          <p>
            Go to
            <Link to='/dashboard'>{' '}
              <span className='text-lime-600 font-semibold'>Dashboard</span>
            </Link>{' '}
            <span>or</span>{' '}
            <Link to='/unis'>
              <span className='text-lime-600 font-semibold'>Universities List</span>
            </Link>
            <span>or</span>{' '}
            <Link to='/login'>
              <span className='text-lime-600 font-semibold'>Login</span>
            </Link>
            <span>or</span>{' '}
            <Link to='/register'>
              <span className='text-lime-600 font-semibold'>Register</span>
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Unauthorized
