import { ToastContainer } from 'react-toastify'
import Routes from './components/Routes'

function App () {
  return (
    <div className='bg-slate-800'>
      <ToastContainer
        position='top-right'
        theme='dark'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes/>
    </div>
  )
}

export default App
