import axios from 'axios'
import { useState, useEffect } from 'react'

import Card from 'react-bootstrap/Card'

import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'

import { Carousel } from 'react-responsive-carousel'
import Container from 'react-bootstrap/esm/Container'
// import YoutubeEmbed from './video/YoutubeEmbed'



const Theatre = () => {
  const [ venueData, setVenueData ] = useState([])
  const [ errors, setErrors ] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/venue/')
        console.log(data)
        setVenueData(data)
      } catch (error) {
        setErrors(error.message)
        console.log(error.message)
      }
    } 
    getData()
  }, [])
  {/* <Carousel>
      <div>
        <img src={venueData[0].image_one} />
        <p className="legend">Legend 1</p>
      </div>

      <div>
        <img src={venueData[1].image_two} />
        <p className="legend">Legend 3</p>
      </div>
      <div>
        <img src={venueData[2].image_three} />
        <p className="legend">Legend 3</p>
      </div>
    </Carousel> */}



  return (
    <Container className='theatre-height'>
      <div className='inner-main'>
        <h1>Hello page</h1>

        {venueData.map((item) => {
          const { id } = item
          console.log(item)
          return (
            <Col key={id} md="5" lg="4" className='mb-4'>
              <div className='hello'>
              
                <Link style={{ textDecoration: 'none', color: 'black' }} to={`/theatre/${id}`}>
                  <Card className='main-card'>
                    <Card.Img className='card-images' variant='top' src={item.image_one}></Card.Img>
                    <Card.Body className='bg-light'>
                      <Card.Title className='multi-card text-center mb-0 text-decoration-none'>{item.name} - {item.location}</Card.Title>
                    </Card.Body>
              
                  </Card>
                </Link>
              
              </div>
            </Col>
          )
        })}

      

      </div>
    </Container>
  )


}

export default Theatre