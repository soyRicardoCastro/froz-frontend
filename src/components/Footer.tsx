import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className='w-full mt-28 px-6 py-2 rounded-lg shadow bg-slate-800 md:flex md:items-center md:justify-between'>
      <div>
        <span className='text-sm text-gray-400 sm:text-center'>© 2022{' '}<Link to='/' className='text-sm text-gray-400 sm:text-center'>FROZ</Link>. All Rights Reserved.</span>
      </div>
      <ul className='flex text-gray-400 flex-wrap items-center justify-center text-sm sm:mt-0'>
        <li className='last:mr-0 md:mr-6 mt-1'>
          <Link to='/about' className='hover:underline'>
            About
          </Link>
        </li>
        <li className='last:mr-0 md:mr-6 mt-1'>
          <Link to='/privacy-policy' className='hover:underline'>
            Privacy Policy
          </Link>
        </li>
        <li className='last:mr-0 md:mr-6 mt-1'>
          <Link to='/licensing' className='hover:underline'>
            Licensing
          </Link>
        </li>
        <li className='last:mr-0 md:mr-6 mt-1'>
          <Link to='/contact' className='hover:underline'>
            Contact
          </Link>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
