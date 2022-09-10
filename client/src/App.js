import NavBar from './components/Navigation/NavBar'
import Theatre from './components/Theatre'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Footer from './components/Navigation/Footer'
import TheatreSingle from './components/TheatreSingle'
const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar /> 
        <Routes>  
          <Route path='/login' element={<Login />} />
          <Route path='/theatre' element={<Theatre />}  />
          <Route path='/register' element={<Register />}  />
          <Route path='/login' element={<Login />}  />
          <Route path='/theatre/:playId' element={<TheatreSingle /> } />

        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
