import { useParams } from 'react-router-dom'
import { Layout } from '../components'
import { useUni } from '../query'

function Uni () {
  const params = useParams()
  const id = params.id as string
  const { data: uni, isLoading, isFetching, error } = useUni(id)

  return (
    <Layout
      title={uni?.name ? uni.name : 'University'}
      category='Users'
      isLoading={isLoading}
      isFetching={isFetching}
      error={error}
    >
      <div className='w-4/5 mx-auto h-full flex flex-col gap-5'>
        <h1 className='text-2xl'>
          Name: <span className='text-white font-semibold'>{uni?.name}</span>
        </h1>
        <h1 className='text-2xl'>
          State: <span className='text-white font-semibold'>{uni?.state}</span>
        </h1>
        <h2 className='text-2xl'>
          Division:{' '}
          <span className='text-white font-semibold'>{uni?.division}</span>
        </h2>

        <ul className='my-5'>
          <li>
            <h2 className='text-xl font-semibold'>Careers:</h2>
          </li>
          {uni?.careers.map((career) => (
            <ol key={career._id}>{career.name}</ol>
          ))}
        </ul>

        <div className='flex flex-col'>
          <h3 className='text-2xl'>Coachs:</h3>

          {uni?.coachs?.map((coach, i) => (
            <div key={i} className='my-5'>
              <p>
                Name: <span className='font-semibold'>{coach.name}</span>
              </p>
              <p>
                Contact: <span className='font-semibold'>{coach.contact}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Uni
