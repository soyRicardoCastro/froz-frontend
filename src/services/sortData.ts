import { University, User, UniKeys, UserKeys } from '../types'
type Uni = University['body'] | undefined
type U = User['body'] | undefined

interface Props {
  body: {
    tableData: any
    sortKey: UniKeys | UserKeys
    reverse: boolean
    data: Array<any>
  }
}

export default function sortData({ tableData, sortKey, reverse, data }: Props['body']) {
  if (!sortKey) return tableData

  const sortedData = data?.sort((a, b) => {
    return a[sortKey] > b[sortKey] ? 1 : -1

    if (reverse) return sortedData.reverse()
  })
}
