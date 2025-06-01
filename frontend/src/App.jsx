import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Contect from './pages/Contect'
import About from './pages/About'
import Login from './pages/login'
import Myprofile from './pages/Myprofile'
import Myappointment from './pages/Myappointment'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
          <Navbar/>
          <Routes>
              <Route  path='/' element={<Home/>} />
              <Route  path='/doctors' element={<Doctors/>} />
              <Route  path='/doctors/:speciality' element={<Doctors/>} />
              <Route  path='/contact' element={<Contect/>} />
              <Route  path='/about' element={<About/>} />
              <Route  path='/login' element={<Login/>} />
              <Route  path='/myprofile' element={<Myprofile/>} />
              <Route  path='/myappointment' element={<Myappointment/>} />
              <Route  path='/appointment/:docID' element={<Appointment/>} />
          </Routes>
          <Footer/>
    </div>
  )
}

export default App