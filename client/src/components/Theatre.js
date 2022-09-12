import axios from 'axios'
import { useState, useEffect } from 'react'

import Card from 'react-bootstrap/Card'

import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'



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



  return (
    <div className='theatre-height'>
      <h1>Hello page</h1>
      {venueData.map((item) => {
        const { id } = item
        console.log(item)
        return (
          <Col key={id} md="5" lg="4" className='mb-4'>
            <Link style={{ textDecoration: 'none', color: 'black' }} to={`/theatre/${id}`}>
              <Card >
                <Card.Img className='card-images' variant='top' src={item.image_one}></Card.Img>
                <Card.Body className='bg-light'>
                  <Card.Title className='multi-card text-center mb-0 text-decoration-none'>{item.name} - {item.location}</Card.Title>
                </Card.Body>
              
              </Card>
            </Link>
          </Col>
        )
      })}

      


    </div>
  )


}

export default Theatre