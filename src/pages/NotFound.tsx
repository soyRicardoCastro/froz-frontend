import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

function NotFound () {
  return (
    <section className='h-screen bg-cover'>
      <div className='flex h-full w-full items-center justify-center container mx-auto px-8'>
        <div className='max-w-2xl text-center flex flex-col items-center justify-center'>
          <img src={logo} alt='Froz Logo' className='mb-6' />
          <h1 className='text-3xl sm:text-5xl capitalize tracking-widest text-white lg:text-7xl'>
            Error 404 - Page not Found
          </h1>

          <p className='mt-6 lg:text-lg text-white'>
            This page does not exist, please go to one this links
          </p>
          <p>
            Go to{' '}
            <Link to='/dashboard'>
              {' '}
              <span className='text-lime-600 font-semibold'>Dashboard</span>
            </Link>{' '}
            <span>or</span>{' '}
            <Link to='/unis'>
              <span className='text-lime-600 font-semibold'>
                Universities List
              </span>
            </Link>{' '}
            <span>or</span>{' '}
            <Link to='/login'>
              <span className='text-lime-600 font-semibold'>Login</span>
            </Link>{' '}
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

export default NotFound
