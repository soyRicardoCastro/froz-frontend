import { Email, Layout } from '../components'

function SendMessages() {
  return (
    <Layout
      title='Contact a University'
      category='User'
    >
      <div className='w-4/5 mx-auto flex items-center'>
        <Email />
      </div>
    </Layout>
  )
}

export default SendMessages