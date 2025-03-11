import { Route, Routes } from 'react-router'
import './App.css'
import Register from './auth/Register'
import Login from './auth/Login'
import Outlet from './home/Outlet'
import Footer from './home/Footer'

function App() {

  return (
    <section className=''>
      <Routes>
        <Route index element={<Outlet/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </section>
  )
}

export default App
