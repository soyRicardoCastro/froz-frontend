import {
  MouseEventHandler,
  useState,
  useEffect,
  useCallback,
  ChangeEvent
} from 'react'
import { ArrowUpIcon, ArrowDownIcon, TrashIcon, PencilIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'
import { Table, Checkbox } from 'flowbite-react'
import { toast } from 'react-toastify'
import { Layout } from '../components'
import { useUnis, useUser } from '../query'
import { UniKeys, SortOrder, University } from '../types'
import axios from '../services/axios'
import useStore from '../store'

interface Props {
  sortData: {
    tableData: Array<University['body']> | undefined
    sortKey: UniKeys
    reverse: boolean
    search: string
  }
  sortButton: {
    sortOrder: SortOrder
    columnKey: UniKeys
    sortKey: UniKeys
    onClick: MouseEventHandler<HTMLButtonElement>
  }
}

function Unis () {
  const { user, setUser } = useStore()
  const [sortKey, setSortKey] = useState<UniKeys>('_id')
  const [sortOrder, setSortOrder] = useState<SortOrder>('ascn')
  const [userUnis, setUserUnis] = useState<string[]>([])
  const [search, setSearch] = useState<string>('')

  const { data: unis, error, isFetching, isLoading, refetch } = useUnis()
  const id = user?._id as string
  const { data, refetch: refetchUser } = useUser(id)

  useEffect(() => {
    if (data == null) return
    setUser(data)
  }, [data])

  function sortData ({
    tableData,
    sortKey,
    reverse,
    search
  }: Props['sortData']) {
    if (search) {
      return tableData?.filter(
        (u) =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.state.toLowerCase().includes(search.toLowerCase()) ||
          u.division.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (!sortKey) return tableData

    const sortedData = unis?.sort((a, b) => {
      return a[sortKey] > b[sortKey] ? 1 : -1
    })

    if (reverse) return sortedData?.reverse()

    return sortedData
  }

  function SortButton ({
    sortOrder,
    columnKey,
    sortKey,
    onClick
  }: Props['sortButton']) {
    return (
      <button onClick={onClick}>
        {sortKey === columnKey && sortOrder === 'desc'
          ? (
            <ArrowDownIcon className='text-xs text-white w-2' />
            )
          : (
            <ArrowUpIcon className='text-xs text-white w-2' />
            )}
      </button>
    )
  }

  const sortedData = useCallback(
    () =>
      sortData({
        tableData: unis,
        sortKey,
        reverse: sortOrder === 'desc',
        search
      }),
    [unis, sortKey, sortOrder, search]
  )

  function changeSort (key: UniKeys) {
    setSortOrder(sortOrder === 'ascn' ? 'desc' : 'ascn')
    setSortKey(key)
  }

  const headers: Array<{ key: UniKeys, label: string }> = [
    { key: 'name', label: 'Name' },
    { key: 'state', label: 'State' },
    { key: 'division', label: 'Division' },
    { key: 'coachs', label: 'Coachs' }
  ]

  function handleCheckboxChange ({ target }: ChangeEvent<HTMLInputElement>) {
    if (target.checked) {
      if ((user?.universities?.find((u) => u.name === target.value)) != null) {
        target.checked = false
        return toast.warning(
          'You already have this university in your list'
        )
      }
      userUnis.push(target.value)
      console.log(userUnis)
      return
    }

    if (!target.checked) {
      const unisFiltered = userUnis.filter((u) => u !== target.value)
      setUserUnis(unisFiltered)
    }
  }

  async function handleSubmit () {
    if (userUnis.length === 0) return toast.warning('Please select at least 1')
    if (user == null) return toast.error('You need login')
    try {
      toast.promise(async () => await axios.post(`/api/add-user-uni/${user._id}`, {
        universities: userUnis
      }), {
        error: "Error:(",
        pending: "Pending...",
        success: "Added successfully"
      })
      refetchUser()
      if (data == null) return
      setUser(data)
    } catch (e: any) {
      toast.error(e)
      console.log(e)
    }
  }

  return (
    <Layout
      title='Universities'
      category='Users'
      error={error}
      isFetching={isFetching}
      isLoading={isLoading}
    >
      <div className='w-full mx-auto flex flex-col gap-2'>
        <input
          placeholder='Find University'
          className='py-2 px-3 ml-4 rounded-full bg-white text-black w-40'
          value={search}
          type='text'
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className='w-40 ml-4 py-3 px-5 rounded-full bg-lime-500 hover:cursor-pointer hover:bg-lime-600'
        >
          Add Unis
        </button>
        <Table hoverable className='w-[90%] mx-auto border-lg dark'>
          <Table.Head>
            <Table.HeadCell className='!p-4'>
              {/* <Checkbox /> */}
            </Table.HeadCell>
            {headers.map((row) => {
              return (
                <Table.HeadCell key={row.key} className='text-white'>
                  {row.label}{' '}
                  <SortButton
                    columnKey={row.key}
                    onClick={() => changeSort(row.key)}
                    {...{
                      sortOrder,
                      sortKey
                    }}
                  />
                </Table.HeadCell>
              )
            })}
            {user?.role.includes('admin') && (
              <Table.HeadCell>
                Actions
              </Table.HeadCell>
            )}
          </Table.Head>
          <Table.Body className='divide-y'>
            {sortedData()?.map((uni) => (
              <Table.Row
                key={uni._id}
                className='bg-white dark:border-gray-700 dark:bg-gray-800'
              >
                <Table.Cell className='!p-4'>
                  <Checkbox onChange={handleCheckboxChange} value={uni.name} />
                </Table.Cell>
                <Table.Cell className='whitespace-nowrap font-medium text-white'>
                  <Link to={`/unis/${uni._id}`}>{uni.name}</Link>
                </Table.Cell>
                <Table.Cell className='text-gray-200'>{uni.state}</Table.Cell>
                <Table.Cell className='text-gray-200'>
                  {uni.division}
                </Table.Cell>
                <Table.Cell className='text-gray-200'>
                  {uni.coachs.map((item, i) => (
                    <div key={i} className='mb-2'>
                      <div className='text-gray-400'>{item.name}</div>
                      <div className='text-gray-200'>{item.contact}</div>
                    </div>
                  ))}
                </Table.Cell>
                {user?.role.includes('admin') && (
                  <Table.Cell>
                  <button onClick={async () => {
                    toast.promise(async () => await axios.delete(`/api/unis/${uni._id}`), {
                      pending: 'Deleting',
                      success: 'Deleted successfully',
                      error: 'Internal server error'
                    })
                    refetch()
                  }}>
                    <TrashIcon className='h-5 w-5 text-white' />
                  </button>
                  <Link to={`/unis/${uni._id}/edit`}>
                    <PencilIcon className='w-5 h-5 text-white' />
                  </Link>
                </Table.Cell>
                )}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </Layout>
  )
}

export default Unis
