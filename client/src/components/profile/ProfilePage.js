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

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.put('/api/auth/profile/', updatedUserProfile, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log(data)
      navigate('/')
    } catch (error) {
      setErrors(error.message)
      console.log(error.message)
    }
  }
  const handleChange = (event) => {
    setUpdatedUserProfile({ ...updatedUserProfile, [event.target.name]: event.target.value })
    setErrors({ ...errors, [event.target.name]: '', message: '' })
  }

  
  return (
    <Container as='main' className='profile-main'>
      <h1>{userProfile.email}</h1>
      {userProfile ? (
        <>
          {userProfile.email && (
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={userProfile.profile_image} />
              <Card.Body>
                <Card.Title><h1> HI, {userProfile.username}</h1></Card.Title>
                <Card.Text>
                  <h1>Welcome, {userProfile.name} </h1>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc id cursus metus aliquam eleifend mi. Nulla aliquet enim tortor at auctor urna nunc id. Vivamus at augue eget arcu dictum varius duis at consectetur. Dictum fusce ut placerat orci.
                </Card.Text>
              </Card.Body>
              {/* <ListGroup className="list-group-flush">
                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
              </ListGroup> */}
              {/* <Card.Body>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
              </Card.Body> */}
              <Card.Body>
                {/* <Link to={'/profileEdit/'} className='btn btn-primary'>Edit Profile</Link> */}
                <Link to={`/profileEdit/${userProfile.id}`} className='btn btn-primary'>Edit Profile</Link>

              </Card.Body>
            </Card>
          )}
          <h1>Welcome, {profile.email}</h1>
          <Card>
          </Card>
          <hr />
          <h1>Theatre plays you went! </h1>
          <Card>
          </Card>
        </>
      ) : (
        <>
          {errors ? <h2>Oops something went wrong.</h2> : <h2>Loading...</h2>}
        </>
      )}
    </Container>
  )
}
export default ProfilePage