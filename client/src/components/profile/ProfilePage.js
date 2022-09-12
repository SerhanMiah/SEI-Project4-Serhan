import axios from 'axios'
import { useEffect, useState } from 'react'

import { useParams, Link } from 'react-router-dom'
import { getToken } from '../helpers/auth.js'
import Container from 'react-bootstrap/Container'



const ProfilePage = () => {

  // const { userId } = useParams()


  const [ userProfile, setUserProfile ] = useState({})
  const [ venue, setVenue ] = useState([])
  const [ errors, setErrors ] = useState(false)


  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const { data } = await axios.get('/api/venue/')
  //       setVenue(data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   getData()
  // }, [setVenue])

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axios.get('/api/auth/profile/', {
          headers: { Authorization: `Bearer ${getToken()}` },
        })
        console.log(data)
        setUserProfile(data)
      } catch (error) {
        console.log(error)
      }
    }
    getProfile()
  }, [])




  return (
    <Container className='profile'>
      {userProfile ? (
        <>
          <h1>Hello, {userProfile.email}</h1>
          <h1>Hello, {userProfile.username}</h1>

        </>
      ) : (
        <>
          {errors ? <h2>Error detail.</h2> : <h2>Loading...</h2>}
        </>
      )}
    </Container>
  )
}


export default ProfilePage