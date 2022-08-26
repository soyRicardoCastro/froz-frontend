import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { AxiosResponse } from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from '../services/axios'
import { User } from '../types'
import { loginSchema, LoginInput } from '../schema/auth.schema'
import useStore from '../store'
import logo from '../assets/logo.png'

function Login () {
  const [loginError, setLoginError] = useState<any | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema)
  })

  const { setUser } = useStore()

  const nav = useNavigate()

  async function onSubmit (values: LoginInput) {
    try {
      console.log(loginError)
      setLoading(true)
      const { data }: AxiosResponse<User['body']> = await axios.post(
        '/api/login',
        values
      )
      setLoading(false)
      setUser(data)
      nav('/dashboard', { replace: true })
    } catch (e: any) {
      console.log(e)
      setLoginError(e.message)
      setLoading(false)
    }
  }

  console.log({ errors })

  return (
    <main className='relative min-h-screen w-full bg-slate-800'>
      <div className='p-6'>
        <header className='flex w-full justify-end'>
          <div>
            <Link
              to='/register'
              className='rounded-2xl border-b-2 border-b-lime-300 bg-lime-400 py-3 px-4 font-bold text-white ring-2 ring-lime-300 hover:bg-lime-600 active:translate-y-[0.125rem] active:border-b-lime-200 transition'
            >
              REGISTER
            </Link>
          </div>
        </header>
        <section className='flex flex-col items-center justify-center mx-auto max-w-sm'>
          <img src={logo} alt='Froz logo' className='my-14' />
          <div className='space-y-4'>
            <h1 className='text-4xl font-bold mb-6 text-center'>Log in</h1>

            <p className='text-center text-red-500 text-md'>
              {loginError && 'Wrong email or password'}
            </p>

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
                    LOG IN
                  </button>
                  )}
            </form>
            <p className='text-white text-sm'>
              Go to{' '}
              <Link to='/register' className='text-lime-500 hover:underline'>
                Register Page
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Login
