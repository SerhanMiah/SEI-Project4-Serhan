import axios from 'axios'
import { useState, useEffect } from 'react'

import Card from 'react-bootstrap/Card'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom'
import Spinner from './Spinner'

import { Carousel } from 'react-responsive-carousel'
import Container from 'react-bootstrap/esm/Container'



const Theatre = () => {
  const [ venueData, setVenueData ] = useState([])
  const [ errors, setErrors ] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/venue/')
    
        setVenueData(data)
      } catch (error) {
        setErrors(error)
      }
    } 
    getData()
  }, [])

  return (
    <Container className='main'>
      <div>
        { venueData 
          ?
          <div className='all-theatre-page'>
    
            <Container as="main-page" className='destination-index'>
              <Row className='destination-row'>
                { venueData.map(item => {
                  const { id } = item
                  return (
                    <Col key={id} md="5" lg="4" className='mb-4'>
                      <Link style={{ textDecoration: 'none', color: 'black' }} to={`/theatre/${id}`}>
                        <Card >
                          <Card.Img className='card-images' variant='top' src={item.image_one}></Card.Img>
                          <Card.Body className='bg-light'>
                            <Card.Title className='multi-card text-center mb-0 text-decoration-none'>{item.name} - {item.country}</Card.Title>
                          </Card.Body>
                        </Card>
                      </Link>
                    </Col>
                  )
                })
                }
              </Row>
            </Container>
          </div>
          :
          
          <h2 className='text-center'>
            { errors ? 'Something went wrong. Please try again later' : <Spinner />}
          </h2> 
        }
      </div>
    </Container>
  )

}

export default Theatre