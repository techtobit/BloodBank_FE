import { Route, Routes } from 'react-router'
import './App.css'
import Register from './auth/Register'
import HeroPage from './home/HeroPage'
import Navgiation from './home/Navgiation'
import DonnarList from './home/DonnarList'

function App() {

  return (
    <section className='relative'>
    <Navgiation/>
    <HeroPage/>
    <DonnarList/>
    <Routes>
      {/* <Route path="/" element={<HeroPage />} /> */}
      <Route path="/register" element={<Register />} />
    </Routes>
    </section>
  )
}

export default App
