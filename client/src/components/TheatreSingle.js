import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { getToken } from './helpers/auth'
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
  const [ resStatus, setResStatus] = useState([])

  const [ liking, setLiking ] = useState(0)

  const [score, setScore] = useState(0)
  const [ reviewsRemoved, setReviewsRemoved ] = useState(0)


  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/venue/${playId}`)
        console.log(data)
        setTheatre(data)
        console.log('this is the review ---->', data.review)
        setReviews(data.review)
        setLike(data.likes)
        console.log(setLike)
      } catch (error) {
        setErrors(error.message)
        console.log(error.message)
      }
    } 
    getData()
  }, [playId])

  function allLikes(event, likes) {
    setLiking(liking + 1)
    if (event.target.value === likes) {
      setLiking(likes + 1)
    }
  }
  // const headers = () => {
  //   const token = getToken().split(' ')[1]
  //   return {
  //     headers: { Authorization: `Bearer ${getToken()}` },
  //   }
  // }

  const handleSubmitReview = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/review/', reviews, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log(data)
      setReviews({ text: '', theatre_id: '', owner: '' })
      setTheatre(data)
      console.log(setReviews)
    } catch (error) {
      console.log(error)
      // setErrors(error)
    }
  }
  

  const handleChange = async (event) => {
    setReviews({ ...reviews, [event.target.name]: event.target.value })
    setErrors({ ...errors, [event.target.name]: '', message: '' })
  }
  const handleChangeLike = async (event) => {
    setLike({ ...like, [event.target.name]: event.target.value })
    // setErrors({ ...errors, [event.target.name]: '', message: '' })
  }

  // const deleteReview = async (event, reviewId) => {
  //   event.preventDefault()
  //   try {
  //     const { data } = await axios.delete(`/api/review/${reviewId}`, {
  //       headers: {
  //         Authorization: `Bearer ${getToken()}`,
  //       },
  //     })
  //     console.log(data)
  //     setReviewsRemoved(reviewsRemoved + 1)
  //   } catch (error) {
  //     // setErrors(error.message)
  //     console.log(error.message)
  //   }
  // }
  return (
    <Container as="main">
      <Row>
        { theatre ? 
          <>
            <h1>{theatre.name}</h1>
            <Col md="6">
              {/* <img className='w-100' src={theatre.location_images} alt={theatre.name} /> */}
            </Col>
            <Col md="6">
              <h2>Description</h2>
              <p>{theatre.name}</p>
              <hr />
              <h2><span>🌍</span> Origin</h2>
              <p>{theatre.name}</p>
              <hr />
              <h2><span></span> Added by</h2>
              <p>{theatre.name}</p>
              <hr />
              <h2><span></span> Likes</h2>
              <p>{theatre.likes}</p>
              <p>{theatre.dislikes}</p>
              <hr />
              <Link to="/theatre" className='btn dark'>Back to all Home</Link>
            </Col>
            <div className='liketest'>
              <Button className='btn btn-primary btn-lg btn-block' variant="primary" size="lg" value={like.likes} onClick={(event) => {
                console.log({ like })
                allLikes(event, like ) 
              } }>{like.likes}1</Button>
            </div>
            <div className='dislike-button'>
              <Button className='btn btn-primary btn-lg btn-block' variant="primary" size="lg" value={like.likes} onClick={(event) => {
                console.log({ like })
                allLikes(event, like ) 
              } }>{like.dislike}0</Button>
            </div>
            
            <Container as='section' className='review-card'>
              <h3>Reviews</h3>
              { reviews.length > 0
                ?
                reviews.map(review => {
                  const { id, owner, text } = review
                  return (                       
                    <Card key={review.id} className="re-card">
                      <Card.Body>      
                        <Card.Text>
                          {review.text} - {review.owner.username}
                        </Card.Text>                 
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
              {/* {formData.text} */}
              {/* </textarea> */}
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