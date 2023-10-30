import { useLayoutEffect } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import MainPage from './pages/MainPage/MainPage'
import { fetchCertificates } from './redux/action-creators/certificates'
import { useDispatch } from 'react-redux'
import CertificatePage from './pages/CertificatePage/CertificatePage'
import PaymentPage from './pages/PaymentPage/PaymentPage'

function App() {
  const dispatch = useDispatch()
  
  useLayoutEffect(() => {
    //@ts-ignore
    dispatch(fetchCertificates())
  }, [])
  
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<MainPage/>}/>
          <Route path='certificate/:id' element={<CertificatePage/>}/>
          <Route path='payment' element={<PaymentPage/>}/>
        </Route>
      </Routes>
    </>
      
  )
}

export default App

