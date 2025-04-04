import { Route, Routes } from 'react-router'
import { ToastContainer } from 'react-toastify'
import './App.css'
import Register from './auth/Register'
import Login from './auth/Login'
import Outlet from './home/Outlet'
import Footer from './shared/Footer'
import ProtectedRoute from './auth/ProtectedRoute'
import UserProfile from './auth/UserProfile'
import Error404 from './shared/Error404'
import Navgiation from './shared/Navgiation'
import Nav from './shared/Nav'

function App() {

  return (
    <section className=''>
      <Routes>
        <Route path='/' element={<Outlet />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='/profile' element={<ProtectedRoute><UserProfile/></ProtectedRoute>}/>
        <Route path='*' element={<Error404/>}/>
      </Routes>
      {/* <Footer /> */}

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
