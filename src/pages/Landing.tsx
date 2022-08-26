import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'

function Landing () {
  return (
    <main className='h-screen flex flex-col justify-between w-screen bg-slate-800 overflow-hidden'>
      <nav className='flex items-center justify-between w-full h-[70px] bg-slate-900 px-10'>
        <figure className='nav__logo'>
          <img src={logo} alt='Logo Froz' />
        </figure>
        <ul>
          <li className='flex items-center gap-6'>
            <NavLink
              className='font-semibold transition hover:text-gray-200 hover:underline'
              to='/dashboard'
            >
              Chi siamo
            </NavLink>
            <NavLink
              className='font-semibold transition hover:text-gray-200 hover:underline'
              to='/unis'
            >
              Diventa Rallista
            </NavLink>
            <NavLink
              className='font-semibold transition hover:text-gray-200 hover:underline'
              to='/about'
            >
              Diventa Partner
            </NavLink>
          </li>
        </ul>
        <ul>
          <li className='flex items-center gap-6'>
            <NavLink
              className='font-semibold transition hover:text-gray-200'
              to='/login'
            >
              Accedi
            </NavLink>
            <NavLink
              className='font-semibold transition hover:text-gray-200 px-[42px] py-[8px] bg-lime-500 rounded-full'
              to='/register'
            >
              Registrati
            </NavLink>
          </li>
        </ul>
      </nav>

      <header className='flex items-center flex-col justify-center mx-auto h-full w-3/5 gap-3'>
        <h1 className='text-5xl text-center'>Lorem impun dolor sit amet</h1>
        <h3 className='text-3xl text-center'>Asdqq asdf asdasd</h3>
        <NavLink to='/register'>
          <button className='py-4 px-8 rounded-full bg-lime-500 hover:bg-lime-400 transition'>
            Join Now
          </button>
        </NavLink>
      </header>

      <footer className='h-[70px] bg-slate-900 w-screen' />
    </main>
  )
}

export default Landing
