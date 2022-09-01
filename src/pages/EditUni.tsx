import { useEffect, useState } from 'react'
import { getUni } from '../services'
import { useParams, useNavigate } from 'react-router-dom'
import { Layout } from '../components'
import axios from '../services/axios'
import { toast } from 'react-toastify'
import { Coach, CreateUniForm, Career } from '../types'

export default function EditUni ({}) {
  const navigate = useNavigate()
  const params = useParams()
  const id = params.id as string
  const [uni, setUni] = useState<CreateUniForm>({
    name: '',
    state: '',
    careers: [{
      name: ''
    }],
    coachs: [{
      name: '',
      contact: ''
    }],
    division: ''
  })

  const [career, setCareer] = useState<string>('')
  const [careers, setCareers] = useState<Career[]>([])

  const [coachName, setCoachName] = useState<string>('')
  const [coachContact, setCoachContact] = useState<string | undefined>('')

  const [coachs, setCoachs] = useState<Coach[]>([])

  const s = 'w-full border-none bg-slate-900 text-white py-2 px-5 rounded-xl outline-none focus:outline-none'

  useEffect(() => {
    getUni(id).then(({name, state, careers, coachs, division}) => {
      setUni({
        name,
        state,
        careers,
        coachs,
        division
      })
      setCoachs(coachs)
      setCareers(careers)
    }).catch((e) => {
      console.error(e)
      navigate('/unis')
    })
  }, [])

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setUni({ ...uni, [target.name]: target.value });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await toast.promise(async () => await axios.put(`/api/unis/${id}`, uni), {
      pending: "Sending info",
      error: "A error has been occurred",
      success: "Success"
    })
    navigate('/unis')
  }

  const handleClickCoach = () => {
    coachs.push({
      name: coachName,
      contact: coachContact
    })

    setUni({...uni, coachs})

    toast.info('Coach saved')
    setCoachName('')
    setCoachContact('')
  }

  const handleClickCareer = () => {
    const ca = { name: career }
    careers.push(ca)
    setCareer('')
    setUni({...uni, careers})
    toast.info('Career saved')
  }

  return (
    <Layout title='Edit University' category='Admin'>
      <div className='flex justify-center align-center'>
        <form onSubmit={handleSubmit} className='flex flex-col w-4/5 m-auto gap-5'>
          <label>Name</label>
          <input value={uni.name} className={s} name='name' onChange={handleChange} />

          <label>State</label>
          <input value={uni.state} className={s} name='state' onChange={handleChange} />

          <label>Division</label>
          <input value={uni.division} className={s} name='division' onChange={handleChange} />

          <div className='flex flex-col gap-3'>
            <h3 className='text-xl text-white'>Careers</h3>
            <p className='text-xs textgray200'>
              * Write the career and push "Add Career" for save
            </p>

            <input
              className='w-full border-none bg-slate-900 text-white py-2 px-5 rounded-xl outline-none focus:outline-none'
              placeholder='Career Name'
              value={career}
              onChange={(e) => {
                setCareer(e.target.value)
              }}
            />
            <div
              onClick={handleClickCareer}
              className='px-5 py-2 rounded-md bg-slate-600 w-32 hover:cursor-pointer hover:bg-slate-400 transition'
            >
              Add Career
            </div>
          </div>

          <div className='flex flex-col gap-3'>
            <h3 className='text-xl text-white'>Coachs</h3>
            <p className='text-xs textgray200'>
              * Write the coach info and push "Add Coach" for save
            </p>
            <input
              className='w-full border-none bg-slate-900 text-white py-2 px-5 rounded-xl outline-none focus:outline-none'
              placeholder='Coach Name'
              value={coachName}
              onChange={(e) => setCoachName(e.target.value)}
            />
            <input
              className='w-full border-none bg-slate-900 text-white py-2 px-5 rounded-xl outline-none focus:outline-none'
              placeholder='Coach Email'
              value={coachContact}
              onChange={(e) => setCoachContact(e.target.value)}
            />

            <div
              onClick={handleClickCoach}
              className='px-5 py-2 rounded-md bg-slate-600 w-32 hover:cursor-pointer hover:bg-slate-400 transition'
            >
              Add Coach
            </div>
          </div>

          <button>
            Send
          </button>
        </form>
      </div>
    </Layout>
  )
}
