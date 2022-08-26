import { useEffect, useState } from 'react'
import { getUni } from '../services'
import { useParams, useNavigate } from 'react-router-dom'
import { Layout } from '../components'
import axios from '../services/axios'
import { toast } from 'react-toastify'
import { Coach, CreateUniForm } from '../types'

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
      gender: '',
      phone: '',
      email: ''
    }],
    academicRank: '',
    division: ''
  })

  const [coachName, setCoachName] = useState<string>('')
  const [coachEmail, setCoachEmail] = useState<string | undefined>('')
  const [coachPhone, setCoachPhone] = useState<string | undefined>('')
  const [coachGender, setCoachGender] = useState<string | undefined>('')

  const [coachs, setCoachs] = useState<Coach[]>([])

  const s = 'w-full border-none bg-slate-900 text-white py-2 px-5 rounded-xl outline-none focus:outline-none'

  useEffect(() => {
    getUni(id).then(({name, state, careers, coachs, academicRank, division}) => {
      setUni({
        name,
        state,
        careers,
        coachs,
        academicRank,
        division
      })
      setCoachs(coachs)
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
    !coachEmail ? setCoachEmail("without@mail.com") : coachEmail
    !coachPhone ? setCoachPhone("without phone") : coachPhone

    setCoachs([
      ...coachs,
      {
        name: coachName,
        phone: coachPhone,
        email: coachEmail,
        gender: coachGender
      }
    ])
    setUni({...uni, coachs})
    toast.info('Coach saved')
    setCoachName('')
    setCoachEmail('')
    setCoachPhone('')
    setCoachGender('')
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

          <label>Academic Rank</label>
          <input value={uni.academicRank} className={s} name='academicRank' onChange={handleChange} />

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
              value={coachEmail}
              onChange={(e) => setCoachEmail(e.target.value)}
            />
            <input
              className='w-full border-none bg-slate-900 text-white py-2 px-5 rounded-xl outline-none focus:outline-none'
              placeholder='Coach Phone'
              value={coachPhone}
              onChange={(e) => setCoachPhone(e.target.value)}
            />
            <input
              className='w-full border-none bg-slate-900 text-white py-2 px-5 rounded-xl outline-none focus:outline-none'
              placeholder='Coach Gender'
              value={coachGender}
              onChange={(e) => setCoachGender(e.target.value)}
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
