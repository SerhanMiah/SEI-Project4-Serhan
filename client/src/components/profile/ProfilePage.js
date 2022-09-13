import axios from 'axios'
import { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'


import { getToken } from '../helpers/auth.js'
import Container from 'react-bootstrap/Container'
import Row  from 'react-bootstrap/Row'
import  Col from 'react-bootstrap/Col'
import Spinner from '../Spinner'
import profileImg from '../../img/me.webp'

const ProfilePage = () => {

  const [ profile, setProfile ] = useState([])

  const [ userProfile, setUserProfile ] = useState({
    id: '', 
    email: '',
    username: '',
    profile_image: 'http://cdn.onlinewebfonts.com/svg/img_568656.png',
  })
  const [ venue, setVenue ] = useState([])
  const [ errors, setErrors ] = useState(false)



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
        // !why is it undefined
      } catch (error) {
        console.log(error)
      }
    }
    getProfile()
  }, [])

  return (
    <Container as='main' className='profile-main'>
      <h1>{userProfile.email}</h1>

      {userProfile ? (
        <>
          {userProfile.email && (
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={userProfile.profile_image} />
              <Card.Body>
                <Card.Title>{userProfile.username}</Card.Title>
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