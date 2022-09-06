import { useState, useCallback } from 'react'
import { Layout } from '../components'
import { EyeIcon, TrashIcon } from '@heroicons/react/outline'
import { useUsers } from '../query'
import { Table } from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../services/axios'
import { toast } from 'react-toastify'
import { UserKeys, User } from '../types'
import useStore from '../store'

interface Props {
  sortData: {
    tableData: Array<User['body']> | undefined
    search: string
  }
}

function Users () {
  const { data: users, error, isFetching, isLoading, refetch } = useUsers()
  const { user: yourself } = useStore()
  const nav = useNavigate()
  const [search, setSearch] = useState<string>('')

  function sortData ({ tableData, search }: Props['sortData']) {
    if (search) {
      return tableData?.filter(
        (u) =>
          u.firstName.toLowerCase().includes(search.toLowerCase()) ||
          u.lastName.toLowerCase().includes(search.toLowerCase()) ||
          u.age.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase()) ||
          u.gender.toLowerCase().includes(search.toLowerCase())
      )
    }

    return tableData
  }

  const sortedData = useCallback(
    () =>
      sortData({
        tableData: users,
        search
      }),
    [users, search]
  )

  const headers: Array<{ key: UserKeys, label: string }> = [
    { key: 'firstName', label: 'Fullname' },
    { key: 'email', label: 'Email' },
    { key: 'age', label: 'Age' },
    { key: 'gender', label: 'Gender' }
  ]

  return (
    <Layout
      title='Users'
      category='Admin'
      isFetching={isFetching}
      isLoading={isLoading}
      error={error}
    >
      <div className='w-full mx-auto flex flex-col gap-2'>
        <input
          placeholder='Find User'
          className='py-2 px-3 ml-10 rounded-full bg-white text-black w-40'
          value={search}
          type='text'
          onChange={(e) => setSearch(e.target.value)}
        />
        <Table hoverable className='w-4/5 mx-auto border-lg dark'>
          <Table.Head>
            {headers.map((row) => (
              <Table.HeadCell key={row.key} className='text-white'>
                {row.label}
              </Table.HeadCell>
            ))}
            <Table.HeadCell className='text-white'>
              Actions
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y'>
            {sortedData()?.map((user) => (
              <Table.Row key={user._id} className='border-gray-700 bg-gray-800'>
                <Table.Cell className='whitespace-nowrap font-mediumtext-white'>
                  <Link
                    to={`/users/${user._id}`}
                    className='text-white hover:text-blue-500'
                  >
                    {`${user.firstName} ${user.lastName}`}
                  </Link>
                </Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.age}</Table.Cell>
                <Table.Cell>{user.gender}</Table.Cell>
                <Table.Cell className='flex items-center'>
                  <button
                    className='p-2 rounded-full'
                    onClick={async () => {
                      if (user._id === yourself?._id) return toast.error("You can't delete yourself")

                      await toast.promise(async () => await axios.delete(`/api/users/${user._id}`), {
                        pending: "Deleting user",
                        error: "A error has been occurred",
                        success: "Success"
                      })
                      await refetch()
                    }}
                  >
                    <TrashIcon className='w-5 h-5 text-red-500' />
                  </button>
                  <button
                    className='p-2 rounded-full'
                    onClick={() => nav(`/users/${user._id}`)}
                  >
                    <EyeIcon className='w-5 h-5 text-gray-200' />
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </Layout>
  )
}

export default Users
