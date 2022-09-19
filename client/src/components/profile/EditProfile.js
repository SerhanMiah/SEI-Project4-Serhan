import axios from 'axios'
import { useEffect, useState } from 'react'

import { getToken } from '../helpers/auth.js'
import Container from 'react-bootstrap/Container'


import { useNavigate, useParams } from 'react-router-dom'


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

  const [ user, setUser ] = useState([])

  const { userId } = useParams()

  const [ imageSelect, setImageSelected ] = useState('')

  const [ updatedUserProfile, setUpdatedUserProfile ] = useState('')
  const [ newProfileImg, setNewProfileImg ] = useState('')


  console.log(userId)

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axios.get('/api/auth/profile/', {
          headers: 
          { Authorization: `Bearer ${getToken()}` },
        })

        console.log(data)
        // setUserProfile(data)
        console.log('data loading user------->', setUserProfile(data))

        // get request is coming back undefined
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
    formData.append('upload_preset', 'djssiss0') 
    const { data } = await axios.post('https://api.cloudinary.com/v1_1/danedskby/image/upload', formData)
    console.log(data)
    setNewProfileImg(data.url)
    setUpdatedUserProfile({ ...updatedUserProfile, profile_image: data.url })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.put(`/api/auth/profile/${userId}/`, updatedUserProfile, {
        headers: {
          Authorization: `Bearer ${getToken()}`,  
        },
      })
      console.log(data)
      navigate('/')
    } catch (error) {
      setErrors(error)
      console.log(error)
    }
  } 
  const handleChange = (event) => {
    setUpdatedUserProfile({ ...updatedUserProfile, [event.target.name]: event.target.value })
    setErrors({ ...errors, [event.target.name]: '', message: '' })
  }

  return (
    <Container className='Edit-profile-hero'>

      { userProfile.email ? 
        <>
          <Form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-xl-4">
                <div className="card mb-4 mb-xl-0">
                  <div className="card-header">Profile Picture</div>
                  <div className="card-body text-center">
                    <Form.Group className="mb-3" >
                      { newProfileImg ? 
                        <img className='w-100' src={newProfileImg.profile_image} alt={'User Uploaded Profile'} />
                        :
                        <></>
                      }
                      <Form.Label><h2>Upload Image</h2></Form.Label>
                      <Col>
                        <img className='w-100' src={updatedUserProfile.profile_image} alt={updatedUserProfile.userName} />
                      </Col>
        
                      <Form.Control type="file" id="image" className="input" onChange={(event) => {
                        setImageSelected(event.target.files[0])
                      }} />
                      <Button onClick={uploadImage}>Upload image</Button>
                    </Form.Group>
                  </div>
                </div>
              </div>
              <div className="col-xl-8">
                <div className="card mb-4">
                  <div className="card-header">Account Details</div>
                  <div className="card-body">
                    
                    <div className="mb-3">
                      <Form.Group className="mb-3" >
                        <Form.Label>user name</Form.Label>
                        <Form.Control type="text" name="username" placeholder="Edit display name" value={updatedUserProfile.username} onChange={handleChange} /> 
                      </Form.Group>
                      {/* <label className="small mb-1" htmlFor="inputUsername">Username (how your name will appear to other users on the site)</label>
                      <input className="form-control" id="inputUsername" type="text" placeholder="Enter your username" value="username"/> */}
                    </div>

                    <div className="row gx-3 mb-3">
                      <div className="col-md-6">
                        <Form.Group className="mb-3" >
                          <Form.Label>first name</Form.Label>
                          <Form.Control type="text" name="email" placeholder="Edit email" value={updatedUserProfile.first_name} onChange={handleChange} /> 
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                        <Form.Group className="mb-3" >
                          <Form.Label>last name</Form.Label>
                          <Form.Control type="text" name="email" placeholder="Edit email" value={updatedUserProfile.last_name} onChange={handleChange} /> 
                        </Form.Group>
                        {/* <label className="small mb-1" htmlFor="inputLastName">Last name</label>
                        <input className="form-control" id="inputLastName" type="text" placeholder="Enter your last name" value="Luna"/> */}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <Form.Group className="mb-3 w-full" >
                        <Form.Label><h2>About Me</h2></Form.Label>
                        <Form.Control as="textarea" rows={4} name="bio" placeholder="Edit About Me" value={updatedUserProfile.bio} onChange={handleChange} />        
                      </Form.Group>
                    </div>


                    <div className="mb-3">
                      <Form.Group className="mb-3" >
                        <Form.Label>{userProfile.email}</Form.Label>
                        <Form.Control type="text" name="email" placeholder="Edit email" value={updatedUserProfile.email} onChange={handleChange} /> 
                      </Form.Group>
                    </div>

                    <div className="mb-3">
                      <Form.Group className="mb-3" >
                        <Form.Label>Change Password</Form.Label>
                        <Form.Control onChange={handleChange} type="password" name="password" placeholder='Password' value={updatedUserProfile.password}  />
                      </Form.Group>
                    </div>
                    
                    <div className="mb-3">
                      <Form.Group className="mb-3" >
                        <Form.Label>Confirm Change Password</Form.Label>
                        <Form.Control onChange={handleChange} type="password" name="password_confirmation" placeholder='Confirm Password' value={updatedUserProfile.password_confirmation} /> 
                      </Form.Group>
                    </div>
                     


                  </div>
                  <hr />
                  <Button variant="primary" type="submit">Submit</Button>
                  <hr />
                  <Link to={`/users/${userId}`} className='btn dark'>Cancel</Link>
                  <hr />
                  {/* <button className="btn btn-primary" type="button">Save changes</button> */}
                   
                </div>
              </div>
          
            </div>
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