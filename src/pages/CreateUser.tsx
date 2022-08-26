import { Layout, CreateUser } from '../components'
import { Role } from '../types'

interface Props {
  body: {
    role: Role
  }
}

function CreateUserPage ({ role }: Props['body']) {
  return (
    <Layout title={`Create ${role}`} category='Admin'>
      <CreateUser role={role} />
    </Layout>
  )
}

export default CreateUserPage
