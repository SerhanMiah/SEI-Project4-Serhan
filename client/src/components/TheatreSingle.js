import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { getToken, userIsOwner, userIsAuthenticated } from './helpers/auth'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import YoutubeEmbed from './video/YoutubeEmbed'
import { Carousel } from 'react-responsive-carousel'
import Spinner from './Spinner'
import { ListGroup } from 'react-bootstrap'

const TheatreSingle = () => {

  const [ theatre, setTheatre ] = useState(null)
  const [ reviews, setReviews ] = useState([])

  const { playId, reviewId } = useParams()
  const [ errors, setErrors ] = useState(false)

  const [ owner, setOwner ] = useState([])
  const [ update, setUpdate ] = useState([])


  const [ formData, setFormData ] = useState({
    text: '',
    theatre: parseInt(playId),

  })

  const [ reviewsRemoved, setReviewsRemoved ] = useState(0)

  const navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {

      try {
        const { data } = await axios.get(`/api/venue/${playId}/`)
        console.log(data)
        setTheatre(data)
        console.log('this is the review ---->', data.review[0].id)
        setReviews(data.review)
        setOwner(data.owner)
        
      } catch (error) {
        setErrors(error.message)
        console.log(error.message)
      }
    } 
    getData()
  }, [playId])


  
  const handleSubmitReview = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/review/', formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })

      console.log('data ------>', data)
      setFormData({ text: '', theatre: '', owner: '' })
      setTheatre(data)
      console.log(setReviews)
      window.location.reload()
    } catch (error) {
      console.log(error)
      // setErrors(error)
    }
  }

  const handleChange = async (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
    // setErrors({ ...errors, [event.target.name]: '', message: '' })
  }


  const deleteReview = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.delete(`/api/review/${event.target.name}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log('review showing', data.review[0].id)
      setReviews(data.review[0].id)
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  const handleEdit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.put(`/api/review/${event.target.name}/`, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      // console.log('review showing', data.review[0].id)
      setFormData(data)
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <Container className='single-page' as='main'>
        <Row>
          { theatre ? 
            <>
              <Carousel>
                <div>
                  <img src={theatre.image_one} />
                  <p className="legend">Legend 1</p>
                </div>
                <div>
                  <img src={theatre.image_two} />
                  <p className="legend">Legend 3</p>
                </div>
                <div className='youtube'>
                  <YoutubeEmbed embedId={theatre.trailer} />
                </div>
                <div>
                  <img src={theatre.image_three} />
                  <p className="legend">Legend 3</p>
                </div>
              </Carousel>
              <h1>{theatre.name}</h1>
        
              <Col md='6'>
                <img className='w-100' src={theatre.image_one} alt={theatre.name} />
              </Col>
              <Col md='6'>
                <h1>{theatre.name}</h1>
                <p>{theatre.name}</p>
                <hr />
                <h2>Creatures</h2>
                <h2><span></span>Description</h2>
                <p>{theatre.description}</p>
                <hr />
                {/* {theatre.trailer && 
                <Col className='title-media mb-4 justify-content-center mt-4'>
                  <div className='youtube'>
                    <YoutubeEmbed embedId={theatre.trailer} />
                  </div>
                </Col>
                } */}
                <hr />
                <Link to='/theatre' className='btn dark'>Back to all theatre</Link>
              </Col>

              {/* COMMENTS SECTION */}

              <Container as='section' className='review-card'>
                <h3>Reviews</h3>
                { theatre.review.length > 0
                  ?
                  theatre.review.map(review => {
                    console.log(review)
                    return (                       
                      <Card key={review.id} className="re-card">
                        {/* <Card.Img variant='top' src={reviewImgUrl[0] ? reviewImgUrl[0] : 'https://sei65-destinations.s3.eu-west-1.amazonaws.com/users/default-image.jpg' }></Card.Img> */}
                        <Card.Body>      
                          <Card.Text>
                            {review.text}
                          </Card.Text>  
                          <ListGroup className="list-group-flush">
                            {/* <ListGroup.Item><span>👤</span> {review.username}</ListGroup.Item>
                            <ListGroup.Item>Rating: {rating}</ListGroup.Item>
                            <ListGroup.Item>Activities: {activities.join(', ')}</ListGroup.Item> */}
                          </ListGroup>       
                          { userIsOwner(review) &&              
                              <div className="buttons mb-4">
                                {/* Delete works! */}
                                <Button name={review.id} onClick={deleteReview}>Delete</Button>
                                <Link to={`/edit-review/${playId}/${review.id}/`} className='btn btn-primary'>Edit Review</Link>
                              </div>  
                          }                         
                        </Card.Body>
                      </Card>          
                    )
                  })
                  :
                  <>
                    { errors ? <h2>Something went wrong. Please try again later</h2> : <p>No reviews yet</p>}
                  </>
                }
              </Container>
              { userIsAuthenticated() ? 
                <Link to={`/add-review/${playId}`}>
                  <button className='back-button btn btn-primary'>Add a review</button>
                </Link>
                :
                <Link to={'/'}>
                  <button className='btn btn-primary'>Login to add a review</button>
                </Link>
              }     
            </>
            :
            <h2 className='text-center'>
              { errors ? <h2>Something went wrong.</h2> : <p>Loading</p>}
            </h2> 
          }
        </Row>
      </Container>
      
    </>
  )
}

export default TheatreSingle