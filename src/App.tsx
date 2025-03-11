import { Route, Routes } from 'react-router'
import './App.css'
import Register from './auth/Register'
import HeroPage from './home/HeroPage'
import DonnarList from './home/DonnarList'
import Footer from './home/Footer'
import UserInteraction from './home/UserInteraction'

function App() {

  return (
    <section className=''>

      <Routes>
        <Route path="/" element={<HeroPage />} />
        {/* <Route path="/" element={<DonnarList />} /> */}
        <Route path="/register" element={<Register />} />
      </Routes>
      <DonnarList />
      <UserInteraction />
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </section>
  )
}

export default App
