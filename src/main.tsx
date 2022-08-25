import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider, createTheme } from '@nextui-org/react'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import App from './App'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'

const theme = createTheme({
  type: 'dark',
})

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <NextUIProvider theme={theme}>
      <HashRouter>
        <App />
      </HashRouter>
    </NextUIProvider>
  </QueryClientProvider>
)
