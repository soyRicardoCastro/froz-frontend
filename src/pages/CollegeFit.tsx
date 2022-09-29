import { Link } from 'react-router-dom'
import { Layout } from "../components"
import { asks } from '../constants'
import useStore from '../store'

export default function CollegeFit () {
  const { user } = useStore()

  return (
    <Layout
      title='My College Fit'
      category='User'
    >
      <main className='w-[90%] m-auto flex flex-col'>
        {user?.questions ? (
        <>
        <h5 className='font-bold underline border-b-white'>{asks[0]}</h5>
        <ul className='mb-[20px]'>
          <li>
            <strong className='text-md'>Athletic and Academic Scholarships</strong>
            <p>{user.questions.ask1}</p>
          </li>
          <li>
            <strong className='text-md'>The Recruitment Proccess</strong>
            <p>{user.questions.ask2}</p>
          </li>

          <li>
            <strong className='text-md'>College Sports in General</strong>
            <p>{user.questions.ask3}</p>
          </li>
        </ul>
 
        <h5 className='font-bold underline border-b-white'>{asks[1]}</h5>
        <p className='mb-[20px]'>{user.questions.ask4}</p>

        <h5 className='font-bold underline border-b-white'>{asks[2]}</h5>
        <p className='mb-[20px]'>{user.questions.ask5}</p>

        <h5 className='font-bold underline border-b-white'>{asks[3]}</h5>
        <ul className='mb-[20px]'>
          {user.questions.ask6.map((state) => (
            <li key={state}>
              <strong className=''>{state}</strong>
            </li>
          ))}
        </ul>

        <h5 className='font-bold underline border-b-white'>{asks[4]}</h5>
        <p className='mb-[20px]'>{user.questions.ask7}</p>

        <h5 className='font-bold underline border-b-white'>{asks[5]}</h5>
        <p className='mb-[20px]'>{user.questions.ask8}</p>

        <h5 className='font-bold underline border-b-white'>{asks[6]}</h5>
        <p className='mb-[20px]'>{user.questions.ask9}</p>

        <h5 className='font-bold underline border-b-white'>{asks[7]}</h5>
        <p className='mb-[20px]'>{user.questions.ask10}</p>

        <h5 className='font-bold underline border-b-white'>{asks[8]}</h5>
        <p className='mb-[20px]'>{user.questions.ask11}</p>
        </>
        ) : (
          <h1 className='text-xl font-bold'>We need your answer in the form questions, please {" "}
            <Link to='/user/get-to-know-you' className='text-lime-400 hover:text-lime-500 transition hover:cursor-pointer hover:underline'>go to Get to know you</Link>
          </h1>
        )}
      </main>
    </Layout>
  )
}
