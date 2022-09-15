import NavBar from './components/Navigation/NavBar'
import Theatre from './components/Theatre'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Footer from './components/Navigation/Footer'
import TheatreSingle from './components/TheatreSingle'
import ProfilePage from './components/profile/ProfilePage'
import Home from './components/Home'
import EditProfile from './components/profile/EditProfile'
// import EditProfile from './components/profile/EditProfile'
import AddReview from './components/pages/AddReview'
import EditReview from './components/pages/EditReview'
import Landing from './components/Landing'
import AddVenue from './components/AddVenue'


const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar /> 
        <Routes>  
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/theatre' element={<Theatre />}  />
          <Route path='/profile/' element={<ProfilePage  />} />
          <Route path='/register' element={<Register />}  />
          <Route path='/login' element={<Login />}  />
          <Route path='/profileEdit/:userId' element={<EditProfile />}  />
          <Route path='/theatre/:playId' element={<TheatreSingle /> } />
          {/* <Route path='/edit-profile/:userId' element={<EditProfile /> } /> */}
          <Route path='/add-review/:playId' element={<AddReview /> } />
          <Route path='/edit-review/:playId/:reviewId' element={<EditReview /> } />

          <Route path='add-venue' element={<AddVenue /> } />

        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
