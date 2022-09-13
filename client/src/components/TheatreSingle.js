import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { getToken, userIsOwner } from './helpers/auth'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import YoutubeEmbed from './video/YoutubeEmbed'
import { Carousel } from 'react-responsive-carousel'


const TheatreSingle = () => {

  const [ theatre, setTheatre ] = useState(null)
  const [ reviews, setReviews ] = useState([])
  const [ like, setLike ] = useState([])
  const { playId } = useParams()
  const [ errors, setErrors ] = useState(false)

  const [ liking, setLiking ] = useState(0)

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
      const { data } = await axios.post('/api/review/', reviews, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log('data ------>', data)
      setReviews({ text: '', theatre_id: '', owner: '' })
      setTheatre(data)
      console.log(setReviews)
      window.location.reload()
    } catch (error) {
      console.log(error)
      // setErrors(error)
    }
  }

  const handleChange = async (event) => {
    setReviews({ ...reviews, [event.target.name]: event.target.value })
    setErrors({ ...errors, [event.target.name]: '', message: '' })
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

  return (
    <Container as="main">
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
              <div>
                <img src={theatre.image_three} />
                <p className="legend">Legend 3</p>
              </div>
            </Carousel>
            <h1>{theatre.name}</h1>
            <Col md="6">
              <h2>Description</h2>
              <p>{theatre.name}</p>
              <hr />
              <h2><span>Happy</span> Venue</h2>
              <p>{theatre.venue}</p>
              <hr />
              <h2><span></span>Location</h2>
              <p>{theatre.location}</p>
              <hr />
              <Link to="/theatre" className='btn dark'>Back to all Home</Link>
            </Col>

            
            <Container as='section' className='review-card'>
              <h3>Reviews</h3>
              { reviews.length > 0
                ?
                reviews.map(review => {
                  
                  return (                       
                    <Card key={review.id} className="re-card">
                      <Card.Body>      
                        <Card.Text>
                          {review.text} - {review.owner.username}
                        </Card.Text>  
                        { userIsOwner(review) &&              
                              <div className="buttons mb-4">
                                <Button variant="danger" name={review.id} onClick={deleteReview}>Delete</Button>
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


            <form
              className="d-flex flex-column justify-content-between"
              onSubmit={handleSubmitReview}>
              <label htmlFor="" name={setReviews.owner}></label>
              <textarea
                name="text"
                placeholder="What do you think about this location?"
                maxLength="280"
                onChange={handleChange}
                required
              >
              </textarea>
              <textarea
                name="theatre"
                placeholder="location"
                maxLength="280"
                onChange={handleChange}
                required
              >
              </textarea>
              <textarea
                name="owner"
                placeholder="owner"
                maxLength="280"
                onChange={handleChange}
                required
              >
              </textarea>

              <input type="submit" value="Add Comment" required />
            </form>
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