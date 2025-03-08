import { Route, Routes } from 'react-router'
import './App.css'
import Register from './auth/Register'
import HeroPage from './home/HeroPage'
import Navgiation from './home/Navgiation'
import DonnarList from './home/DonnarList'
import Footer from './home/Footer'

function App() {

  return (
    <section className='relative'>
    <Navgiation/>
    <Routes>
      <Route path="/" element={<HeroPage />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    <Footer/>
    </section>
  )
}

export default App
