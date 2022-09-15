import axios from 'axios'
import { useEffect, useState } from 'react'
import { getToken } from '../helpers/auth.js'
import Container from 'react-bootstrap/Container'

import { Link } from 'react-router-dom'
import  Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap'
import { Card } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'

const ProfilePage = () => {
  const navigate = useNavigate()
  const [ profile, setProfile ] = useState([])
  const [ userProfile, setUserProfile ] = useState({
    id: '',
    email: '',
    username: '',
    profile_image: 'http://cdn.onlinewebfonts.com/svg/img_568656.png',
  })
  const [ venue, setVenue ] = useState([])
  const [ errors, setErrors ] = useState(false)
  const [ imageSelect, setImageSelected ] = useState('')
  const [ updatedUserProfile, setUpdatedUserProfile ] = useState('')
  const [ newProfileImg, setNewProfileImg ] = useState('')


  const { userId } = useParams()

  
  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axios.get('/api/auth/profile/',  {
          headers:
          { Authorization: `Bearer ${getToken()}` },
        })
        console.log(data)
        setUserProfile(data)
        console.log('data loading user------->', setUserProfile(data))
        setUserProfile(data)
        setUpdatedUserProfile(data)
        // !why is it undefined
      } catch (error) {
        console.log(error)
      }
    }
    getProfile()
  }, [])
  const uploadImage = async (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('file', imageSelect)
    formData.append('upload_preset', 'djssiss0') //? djssiss0 is the key + danedskby is the name
    const { data } = await axios.post('https://api.cloudinary.com/v1_1/danedskby/image/upload', formData)
    // ! this is my (serhan miah) login for the cloudinary - for destination images
    setNewProfileImg(data.url)
    setUpdatedUserProfile({ ...updatedUserProfile, profileImg: data.url })
  }


  
  return (
    <>
      <Container as='main' className='profile-page'>
        <div className='display'>
          {userProfile ? (
            <>
              {userProfile && (
                <>
                  <h1>{userProfile.email}</h1><Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={userProfile.profile_image} alt={userProfile.username} />
                    <Card.Body>
                      <Card.Title><h1> HI, {userProfile.username}</h1></Card.Title>
                      <Card.Text>
                        <h1>Welcome, {userProfile.name} </h1>
                        {userProfile.bio}
                      </Card.Text>
                      <Link to={`/profileEdit/${userProfile.id}`} className='btn btn-primary'>Edit Profile</Link>

                    </Card.Body>
                  </Card>
                </>
            
              )}        
            </>
          ) : (
            <>
              {errors ? <h2>Oops something went wrong.</h2> : <h2>Loading...</h2>}
            </>
          )}
        </div>
      </Container>
    </>
  )
}
export default ProfilePage