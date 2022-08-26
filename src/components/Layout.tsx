import { Sidebar, Header, Loader, Footer } from '.'
// * Testing UI without unnecesary nav
interface Props {
  body: {
    children: JSX.Element
    title: string
    category: string
    isFetching?: boolean
    isLoading?: boolean
    error?: unknown
  }
}// 1065798812

function Layout ({
  children,
  title,
  category,
  isFetching,
  isLoading,
  error
}: Props['body']) {
  return (
    <div className='flex h-full'>
      <Sidebar />

      <div className='flex-1 bg-slate-700 h-full'>
        {/* <Nav /> */}
        <div className='mt-24 mb-16'>
          <Header title={title} category={category} />
          <Loader isFetching={isFetching} isLoading={isLoading} error={error} />
          {children}
        </div>

        <div>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Layout
