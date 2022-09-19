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
import mainPicture from '../../img/cw-49089.jpeg'

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
    <Container as='main' className='Profile-page'>
      <div className='display'>
        {userProfile ? (
          <>
            {userProfile && (
              <div className="container">
                <div className="fb-profile">
                  
                  <img align="left" className="fb-image-lg" src={mainPicture} alt="Profile image example"/>


                  {/* <img align="left" className="fb-image-profile thumbnail" src="http://lorempixel.com/180/180/people/9/" alt="Profile image example"/> */}

                  <Card.Img align="left" className="fb-image-profile thumbnail"  src={userProfile.profile_image} alt={userProfile.username} />

                  <div className="fb-profile-text">
                    <Card.Body>
                      <Card.Title><h1> HI, {userProfile.username}</h1></Card.Title>
                      <Card.Text>
                        <h1>Welcome, {userProfile.name} </h1>
                        {userProfile.bio}
                      </Card.Text>
                      <Link to={`/profileEdit/${userProfile.id}`} className='btn btn-primary'>Edit Profile</Link>

                    </Card.Body>
                    {/* <h1>Eli Macy</h1>
                    <p>Girls just wanna go fun.</p> */}
                  </div>
                </div>
              </div>
            )
            }
          </>
        )  : (
          <>
            {errors ? <h2>Oops something went wrong.</h2> : <h2>Loading...</h2>}
          </>
        )}
      </div>
    </Container>
  )
}

export default ProfilePage