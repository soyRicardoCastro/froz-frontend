import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, RegisterUserInput } from '../schema/auth.schema'
import axios from '../services/axios'
import logo from '../assets/logo.png'

function Register () {
  const [registerError, setRegisterError] = useState<any | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<RegisterUserInput>({
    resolver: zodResolver(registerSchema)
  })

  const nav = useNavigate()

  async function onSubmit (values: RegisterUserInput) {
    try {
      setLoading(true)
      await axios.post('/api/users', values)
      nav('/login', { replace: true })
    } catch (e: any) {
      if (e.code === 409) {
        setRegisterError('Upps.. you can not use this email')
      }

      setRegisterError(e.message)

      setLoading(false)
    }
  }

  return (
    <main className='relative min-h-screen w-full bg-slate-800'>
      <div className='p-6'>
        <header className='flex w-full justify-end'>
          <div>
            <Link
              to='/login'
              className='rounded-2xl border-b-2 border-b-lime-300 bg-lime-400 py-3 px-4 font-bold text-white ring-2 ring-lime-300 hover:bg-lime-600 active:translate-y-[0.125rem] active:border-b-lime-200 transition'
            >
              LOGIN
            </Link>
          </div>
        </header>
        <section className='flex flex-col items-center justify-center mx-auto max-w-sm'>
          <img src={logo} alt='Froz logo' className='my-14' />
          <div className='space-y-4'>
            <h1 className='mb-6 text-4xl font-bold'>Create your profile</h1>

            <p>{registerError}</p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor='email'>Email</label>
                <div className='w-full my-2 rounded-2xl bg-gray-200 px-4 ring-2 ring-gray-100 focus-within:ring-lime-400 text-gray-900'>
                  <input
                    type='email'
                    id='email'
                    placeholder='example@mail.com'
                    autoComplete='off'
                    required
                    className='my-3 w-full border-none bg-transparent outline-none focus:outline-none'
                    {...register('email')}
                  />
                </div>
                <p>{errors.email?.message}</p>
              </div>

              <div>
                <label htmlFor='firstName'>First Name</label>
                <div className='w-full my-2 rounded-2xl bg-gray-200 px-4 ring-2 ring-gray-100 focus-within:ring-lime-400 text-gray-900'>
                  <input
                    type='text'
                    id='firstName'
                    placeholder='Jane Ari'
                    autoComplete='off'
                    required
                    className='my-3 w-full border-none bg-transparent outline-none focus:outline-none'
                    {...register('firstName')}
                  />
                </div>
                <p>{errors.firstName?.message}</p>
              </div>

              <div>
                <label htmlFor='lastName'>Last Name</label>
                <div className='w-full my-2 rounded-2xl bg-gray-200 px-4 ring-2 ring-gray-100 focus-within:ring-lime-400 text-gray-900'>
                  <input
                    type='text'
                    id='lastName'
                    placeholder='Doe Eri'
                    autoComplete='off'
                    required
                    className='my-3 w-full border-none bg-transparent outline-none focus:outline-none'
                    {...register('lastName')}
                  />
                </div>
                <p>{errors.lastName?.message}</p>
              </div>

              <div>
                <label htmlFor='password'>Password</label>
                <div className='w-full my-2 rounded-2xl bg-gray-200 px-4 ring-2 ring-gray-100 focus-within:ring-lime-400 text-gray-900'>
                  <input
                    type='password'
                    id='password'
                    placeholder='******'
                    autoComplete='off'
                    required
                    className='my-3 w-full border-none bg-transparent outline-none focus:outline-none'
                    {...register('password')}
                  />
                </div>
                <p>{errors.password?.message}</p>
              </div>

              <div>
                <label htmlFor='passwordConfirmation'>
                  Password Confirmation
                </label>
                <div className='w-full my-2 rounded-2xl bg-gray-200 px-4 ring-2 ring-gray-100 focus-within:ring-lime-400 text-gray-900'>
                  <input
                    type='password'
                    id='passwordConfirmation'
                    placeholder='******'
                    autoComplete='off'
                    required
                    className='my-3 w-full border-none bg-transparent outline-none focus:outline-none'
                    {...register('passwordConfirmation')}
                  />
                </div>
                <p>{errors.passwordConfirmation?.message}</p>
              </div>

              <div>
                <label htmlFor='age'>Age</label>
                <div className='w-full my-2 rounded-2xl bg-gray-200 px-4 ring-2 ring-gray-100 focus-within:ring-lime-400 text-gray-900'>
                  <input
                    type='text'
                    id='age'
                    placeholder='19'
                    autoComplete='off'
                    required
                    className='my-3 w-full border-none bg-transparent outline-none focus:outline-none'
                    {...register('age')}
                  />
                </div>
                <p>{errors.age?.message}</p>
              </div>

              <div>
                <label htmlFor='gender'>Gender</label>
                <div className='w-full my-2 rounded-2xl bg-gray-200 px-4 ring-2 ring-gray-100 focus-within:ring-lime-400 text-gray-900'>
                  <input
                    type='text'
                    id='gender'
                    placeholder='Female'
                    autoComplete='off'
                    required
                    className='my-3 w-full border-none bg-transparent outline-none focus:outline-none'
                    {...register('gender')}
                  />
                </div>
                <p>{errors.gender?.message}</p>
              </div>

              <div>
                <label htmlFor='address'>Address</label>
                <div className='w-full my-2 rounded-2xl bg-gray-200 px-4 ring-2 ring-gray-100 focus-within:ring-lime-400 text-gray-900'>
                  <input
                    type='text'
                    id='address'
                    placeholder='Street 121 venecian u.'
                    autoComplete='off'
                    required
                    className='my-3 w-full border-none bg-transparent outline-none focus:outline-none'
                    {...register('address')}
                  />
                </div>
                <p>{errors.address?.message}</p>
              </div>

              <div>
                <label htmlFor='phone'>Phone</label>
                <div className='w-full my-2 rounded-2xl bg-gray-200 px-4 ring-2 ring-gray-100 focus-within:ring-lime-400 text-gray-900'>
                  <input
                    type='text'
                    id='phone'
                    placeholder='+112 3123 4 123'
                    autoComplete='off'
                    required
                    className='my-3 w-full border-none bg-transparent outline-none focus:outline-none'
                    {...register('phone')}
                  />
                </div>
                <p>{errors.phone?.message}</p>
              </div>

              {loading
                ? (
                  <button
                    disabled
                    className='w-full rounded-2xl border-b-4 border-b-lime-600 bg-lime-500 py-3 font-bold text-white my-4'
                  >
                    Loading...
                  </button>
                  )
                : (
                  <button
                    type='submit'
                    className='w-full rounded-2xl border-b-4 border-b-lime-600 bg-lime-500 py-3 font-bold text-white hover:bg-lime-400 active:translate-y-[0.125rem] active:border-b-lime-700 my-4'
                  >
                    REGISTER
                  </button>
                  )}
            </form>
            <p className='text-white text-sm'>
              Go to{' '}
              <Link to='/login' className='text-lime-500 hover:underline'>
                Login Page
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Register
