import { useState } from 'react'
import { toast } from 'react-toastify'
import { Layout } from '../components'
import { Career, Coach } from '../types'
import axios from '../services/axios'

const Container = ({title, info, children}: {title: string, info: string, children: JSX.Element[] | JSX.Element}) => (
  <div className='flex flex-col gap-3'>
    <h3 className='text-xl text-white'>{title}</h3>
    <p className='text-xs textgray200'>{info}</p>
    {children}
  </div>
)

const CreateUni = () => {
  const [name, setName] = useState('')
  const [state, setState] = useState('')
  const [academicRank, setAcademicRank] = useState('')
  const [division, setDivision] = useState('')
  const [career, setCareer] = useState('')
  const [careers, setCareers] = useState<Career[]>([])

  const [coachName, setCoachName] = useState('')
  const [coachEmail, setCoachEmail] = useState('')
  const [coachPhone, setCoachPhone] = useState('')
  const [coachGender, setCoachGender] = useState('')

  const [loading, setLoading] = useState(false)

  const s = 'w-full border-none bg-slate-900 text-white py-2 px-5 rounded-xl outline-none focus:outline-none'

  const [coachs, setCoachs] = useState<Coach[]>([])

  async function handleSubmit() {
    setLoading(true)
    await toast.promise(async () => await axios.post('/api/unis', {
      name,
      state,
      academicRank,
      division,
      coachs,
      careers
    }), {
      pending: 'Enviando',
      error: 'Error',
      success: 'Bien ricardo'
    })

    setName('')
    setState('')
    setAcademicRank('')
    setDivision('')
    setLoading(false)
  }

    function addCareer () {
      const ca = { name: career }
      careers.push(ca)
      toast.info('Career saved')
      console.log(careers)
    }

  function addCoach () {
    const coach = {
      name: coachName,
      phone: coachPhone,
      email: coachEmail,
      gender: coachGender
    }

    coachs.push(coach)

    toast.info('Coach saved')

    setCoachName('')
    setCoachEmail('')
    setCoachPhone('')
    setCoachGender('')
    console.log(coachs)
  }

  return (
    <Layout title='Create University' category='Admin'>
       <div className='flex justify-center align-center'>
         <form
           onSubmit={handleSubmit}
           className='w-4/5 mx-auto h-full grid grid-cols-3 gap-5 place-content-center'
         >
          <Container title='Basic Info' info='* Write all the info and when you have all the form completed, push "Create Uni" button'>
            <input
              className={s}
              placeholder='Name'
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
            />
            <input
              className={s}
              placeholder='State'
              value={state}
              onChange={(e) => {
                setState(e.target.value)
              }}
            />
            <input
              className={s}
              placeholder='Academic Rank'
              value={academicRank}
              onChange={(e) => {
                setAcademicRank(e.target.value)
              }}
            />

            <input
              className={s}
              placeholder='Division'
              value={division}
              onChange={(e) => {
                setDivision(e.target.value)
              }}
            />
           </Container>

           <Container title='Careers' info='* Write the career and push "Add Career" for save'>
            <input
              className={s}
              placeholder='Career Name'
              value={career}
              onChange={(e) => {
                setCareer(e.target.value)
              }}
            />
            <div
              onClick={addCareer}
              className='px-5 py-2 rounded-md bg-slate-600 w-32 hover:cursor-pointer hover:bg-slate-400 transition'
             >
               Add Career
             </div>
           </Container>

           <Container title='Coachs' info={`* Write the coach info and push "Add Coach" for save`}>
            <input
              className={s}
              placeholder='Coach Name'
              value={coachName}
              onChange={(e) => setCoachName(e.target.value)}
            />
            <input
              className={s}
              placeholder='Coach Email'
              value={coachEmail}
              onChange={(e) => setCoachEmail(e.target.value)}
            />
            <input
              className={s}
              placeholder='Coach Phone'
              value={coachPhone}
              onChange={(e) => setCoachPhone(e.target.value)}
            />
            <input
              className={s}
              placeholder='Coach Gender'
              value={coachGender}
              onChange={(e) => setCoachGender(e.target.value)}
            />
            <div
              onClick={addCoach}
              className='px-5 py-2 rounded-md bg-slate-600 w-32 hover:cursor-pointer hover:bg-slate-400 transition'
             >
               Add Coach
             </div>
           </Container>

           {loading
             ? (<button
                 className='px-7 py-3 bg-lime-500 transition mt-6 hover:cursor-disabled rounded-xl' disabled>Sending...</button>)
             : ( <button className='px-7 py-3 bg-lime-500 transition mt-6 hover:bg-lime-600 rounded-xl' type='submit'>Create Uni</button>)}
        </form>
      </div>
    </Layout>
  )
}

export default CreateUni
