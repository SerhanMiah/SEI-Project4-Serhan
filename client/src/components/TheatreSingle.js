import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const TheatreSingle = () => {

  const [ theatre, setTheatreSingle ] = useState(null)
  const [ errors, setErrors ] = useState(false)
  const { playId } = useParams()

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/venue/${playId}`)
        console.log(data)
        setTheatreSingle(data)
      } catch (error) {
        setErrors(error.message)
        console.log(error.message)
      }
    } 
    getData()
  }, [])

  return (
    <Container as="main">
      <Row>
        { theatre ? 
          <>
            <h1>{theatre.name}</h1>
            <Col md="6">
              <img className='w-100' src={theatre.images} alt={theatre.name} />
            </Col>
            <Col md="6">
       
              <h2><span>🍽</span> Description</h2>
              <p>{theatre.description}</p>
              <hr />
              
    
              <h2><span>🌍</span> Origin</h2>
              <p>{theatre.name}</p>
              <hr />
          
              <h2><span>👤</span> Added by</h2>
              <p>{theatre.name}</p>
              <hr />
              <Link to="/theatre" className='btn dark'>Back to all Home</Link>
            </Col>
          </>
          :
          <h2 className="text-center">
            Something went wrong. Please try again later
          </h2>
        }
      </Row>
    </Container>
  )   
}

export default TheatreSingle