import { Route, Routes } from 'react-router'
import { ToastContainer } from 'react-toastify'
import './App.css'
import Register from './auth/Register'
import Login from './auth/Login'
import Outlet from './home/Outlet'
import Footer from './home/Footer'

function App() {

  return (
    <section className=''>
      <Routes>
        <Route index element={<Outlet />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </section>
  )
}

export default App
