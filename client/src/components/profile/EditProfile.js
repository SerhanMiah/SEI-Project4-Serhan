import axios from 'axios'
import { useEffect, useState } from 'react'

import { getToken } from '../helpers/auth.js'
import Container from 'react-bootstrap/Container'


import { useNavigate } from 'react-router-dom'


import { Link } from 'react-router-dom'
import  Col from 'react-bootstrap/Col'

import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap'


const EditProfile = () => {
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
    <Container className='editUserContainer'>

      { userProfile.email ? 
        <>
          <Form onSubmit={handleSubmit} className="edit-user-form">
            <h1>Name: { userProfile.email ? userProfile.email : userProfile.email}</h1>
            <h2>Profile</h2>
            <Form.Group className="mb-3" >
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="displayName" placeholder="Edit display name" value={updatedUserProfile.displayName} onChange={handleChange} /> 
            </Form.Group>
            <Col>
              <img className='w-100' src={userProfile.profileImg} alt={updatedUserProfile.userName} />
            </Col>
            <hr />
            <Form.Group className="mb-3" >
              <Form.Label>{userProfile.email}</Form.Label>
              <Form.Control type="text" name="email" placeholder="Edit email" value={updatedUserProfile.email} onChange={handleChange} /> 
            </Form.Group>
            <hr />
            <Form.Group className="mb-3" >
              <Form.Label><h2>About Me</h2></Form.Label>
              <Form.Control as="textarea" rows={4} name="aboutMeText" placeholder="Edit About Me" value={updatedUserProfile.aboutMeText} onChange={handleChange} />        
        
            </Form.Group>
            <hr />
            <Form.Group className="mb-3" >
              { newProfileImg ? 
                <img className='w-100' src={newProfileImg} alt={'User Uploaded Profile'} />
                :
                <></>
              }
              <Form.Label><h2>Upload Image</h2></Form.Label>
        
              <Form.Control type="file" id="image" className="input" onChange={(event) => {
                setImageSelected(event.target.files[0])
              }} />
              <Button onClick={uploadImage}>Upload image</Button>
            </Form.Group>
            <hr />
            <Button variant="primary" type="submit">Submit</Button>
            <hr />
            {/* <Link to={`/users/${userId}`} className='btn dark'>Cancel</Link> */}
            <hr />
          </Form>
        </>
        :
        <h2 className="text-center">
          { errors ? 'Something went wrong. Please try again later' : 'spinner' }
        </h2>

      }  


    </Container>
  )
}


export default EditProfile