import { Loading } from '@nextui-org/react'

interface Props {
  body: {
    isFetching?: boolean
    isLoading?: boolean
    error?: unknown
  }
}

function Loader({ isFetching, isLoading, error }: Props['body']) {
  if (isLoading)
    return (
      <Loading className="ml-14" color="success">
        Loading data...
      </Loading>
    )
  if (isFetching)
    return (
      <Loading className="ml-14" color="success">
        Refreshing data...
      </Loading>
    )
  if (error)
    return (
      <h1 className="text-2xl text-red-600 font-bold">
        Internal server error :/
      </h1>
    )

  return <div></div>
}

export default Loader
