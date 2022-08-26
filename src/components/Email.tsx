import { useState, ChangeEvent, FormEvent, Fragment } from 'react'
import emailjs from 'emailjs-com'
import { useUnis } from '../query'
import useStore from '../store'
import { toast } from 'react-toastify'

interface Props {
  contactCoach: {
    coachEmail: string
    messageToCoach: string
  }
}

const Email = () => {
  const [values, setValues] = useState<Props['contactCoach']>({
    coachEmail: '',
    messageToCoach: ''
  })
  const { data: unis } = useUnis()

  const { user } = useStore()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      console.log(values.coachEmail)
      console.log(values.messageToCoach)
      toast.info('Sending message')
      await emailjs.send(
        'service_lz8h6z4',
        'template_w78wp9z',
        {
          to_name: values.coachEmail,
          from_name: `${user?.firstName} ${user?.lastName} user of Froz`,
          message: values.messageToCoach,
          reply_to: `${user?.email}`,
          to_email: values.coachEmail
        },
        '9E6blvCVY0IfYWKsm'
      )
      toast.success('Message sended successfully')
    } catch (e: any) {
      toast.error('A internal client error has been ocurrer')
      console.error(e)
    }
  }

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex items-center flex-col justify-center w-[90%] h-full gap-4 mx-auto'
    >
      <select
        title='Select the Mail of the coach'
        name='coachEmail'
        className='border-b-2 py-2 outline-none text-white bg-slate-900 w-[90%] h-[60px] rounded-md'
        onChange={handleChange}
        defaultValue='email'
      >
        <option disabled value='email' className='text-gray-200 font-semibold'>
          - Choose a Coach -
        </option>
        {unis?.map((u) => (
          <Fragment key={u._id}>
            <option
              disabled
              key={u._id}
              className='text-gray-400 font-semibold'
            >
              {u.name}
            </option>
            {u.coachs.map((c) => c.email !== '' ? (
              <option value={c.email}>
                {c.name}: {c.email}
              </option>
            ) : null)}
          </Fragment>
        ))}
      </select>
      <textarea
        name='messageToCoach'
        placeholder='Write your message'
        value={values.messageToCoach}
        onChange={handleChange}
        className='h-80 bg-slate-900 border-b-2 w-[90%] rounded-md outline-none'
      />
      <button
        type='submit'
        className='py-3 px-5 rounded-xl bg-lime-500 hover:bg-lime-600 transition w-40'
      >
        Send
      </button>
    </form>
  )
}

export default Email
