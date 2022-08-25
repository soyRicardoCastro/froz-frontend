import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from '../services/axios'
import { Role } from '../types'

interface Props {
  body: {
    role: Role
  }
}

interface CreateUserForm {
  body: {
    firstName: string
    lastName: string
    email: string
    password: string
    phone: string
    gender: string
    age: string
  }
}

function CreateUser({ role }: Props['body']) {
  const [loading, setLoading] = useState<boolean>(false)

  const [user, setUser] = useState<CreateUserForm['body']>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    gender: '',
    age: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      setLoading(true)
      toast.info('Sending info...')
      await axios.post(`/api/create/${role}`, user)
      toast.success('Created successfully')
      setLoading(false)
      setUser({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        gender: '',
        age: '',
      })
    } catch (e: any) {
      toast.error('Internal server error')
      toast.error(e)
      console.error(e)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center mx-auto max-w-sm gap-3"
    >
      <input
        className="w-full border-none bg-slate-900 text-white py-2 px-5 rounded-xl outline-none focus:outline-none"
        value={user.firstName}
        placeholder="First name"
        type="text"
        name="firstName"
        onChange={handleChange}
      />
      <input
        className="w-full border-none bg-slate-900 text-white py-2 px-5 rounded-xl outline-none focus:outline-none"
        value={user.lastName}
        placeholder="Last name"
        type="text"
        name="lastName"
        onChange={handleChange}
      />
      <input
        className="w-full border-none bg-slate-900 text-white py-2 px-5 rounded-xl outline-none focus:outline-none"
        value={user.email}
        placeholder="Email"
        type="email"
        name="email"
        onChange={handleChange}
      />
      <input
        className="w-full border-none bg-slate-900 text-white py-2 px-5 rounded-xl outline-none focus:outline-none"
        value={user.password}
        placeholder="Password"
        type="password"
        name="password"
        onChange={handleChange}
      />
      <input
        className="w-full border-none bg-slate-900 text-white py-2 px-5 rounded-xl outline-none focus:outline-none"
        type="string"
        placeholder="Phone"
        value={user.phone}
        name="phone"
        onChange={handleChange}
      />
      <input
        className="w-full border-none bg-slate-900 text-white py-2 px-5 rounded-xl outline-none focus:outline-none"
        type="string"
        placeholder="Age"
        value={user.age}
        name="age"
        onChange={handleChange}
      />
      <input
        className="w-full border-none bg-slate-900 text-white py-2 px-5 rounded-xl outline-none focus:outline-none"
        type="string"
        placeholder="Gender"
        value={user.gender}
        name="gender"
        onChange={handleChange}
      />

      {loading ? (
        <button disabled className="py-3 px-5 bg-lime-300 rounded-full">
          Loading...
        </button>
      ) : (
        <button
          type="submit"
          className="py-3 px-5 bg-lime-500 rounded-full hover:bg-lime-600 transition"
        >
          Create User
        </button>
      )}
    </form>
  )
}

export default CreateUser
