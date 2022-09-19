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
import Form from 'react-bootstrap/Form'


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
        setTheatre(data)
        setReviews(data.review)
        // console.log(data.review)
        setOwner(data.review[0].owner.id)
        
        

      } catch (error) {
        setErrors(error.message)
        console.log(error.message)
      }
    } 
    getData()
  }, [playId])

  const deleteReview = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.delete(`/api/review/${event.target.name}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log(data)
      setReviewsRemoved(reviewsRemoved + 1)
    } catch (error) {
      setErrors(error.message)
      console.log(error.message)
    }
  }

  // swiper! 
 







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
      navigate(`/theatre/${playId}`)
    } catch (error) {
      console.log(error)
      setErrors(error.message)
    }
  }

  const handleChange = async (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
    setErrors({ ...errors, [event.target.name]: '', message: '' })
  }



  return (
    <>
      <Container className='single-page' as='main'>
        <Row>
          { theatre ? 
            <>
              <Carousel>
                <div className='youtube w-100'>
                  <YoutubeEmbed embedId={theatre.trailer} autoPlay/>
                </div>
                <div>
                  <img className='w-100' src={theatre.image_one} autoPlay/>
                  <p className="legend">Legend 1</p>
                </div>
                <div>
                  <img className='w-100' src={theatre.image_two} autoPlay />
                  <p className="legend">Legend 3</p>
                </div>
              
                <div>
                  <img className='w-100' src={theatre.image_three} autoPlay/>
                  <p className="legend">Legend 3</p>
                </div>
              </Carousel>
              <h1>{theatre.name}</h1>
        
              <Col md='6'>
                <img className='w-100' src={theatre.image_one} alt={theatre.name} />
              </Col>
              <Col md='6'>
                <h1>{theatre.name}</h1>
                <h2>{theatre.location}</h2>
                <p>{theatre.venue}</p>
                <hr />
                <h2>Description</h2>
                <p>{theatre.description}</p>
                <hr />
                <Button className='primary'><Link to='/theatre' className='btn dark'>Back to all theatre</Link></Button>
                
              </Col>
              {/* COMMENTS SECTION */}

              <Container as='section' className='review-card'>
                <h6>Reviews</h6>
                <h2 className="text-center">Review Section</h2>
                { theatre.review.length >= 0
                  ?
                  theatre.review.map(review => {
                    console.log(review)
                 
                    return (                       
                      <> 

                        
                        {/* Review list */}
                        <div className="review-list">
                          
                          <div className="container">
                          
	
                            <div className="card">
                              <div className="card-body">
                                <div className="row">
                                  <div className="col-md-2">
                                    <img src={review.owner.profile_image} className="img img-rounded img-fluid"/>
                                    <p className="text-secondary text-center">{review.created_at}</p>
                                  </div>
                                  <div className="col-md-10">
                                
                                    <div className="clearfix"></div>
                                    <p>{review.text}</p>
                                    { userIsOwner(review) &&              
                              <div className="buttons mb-4">
                                {/* Delete works! */}
                                <Button name={review.id} onClick={deleteReview}>Delete</Button>
                                <Link to={`/edit-review/${playId}/${review.id}/`} className='btn btn-primary'>Edit Review</Link>
                              </div>  
                                    }                         
                                  
                                  </div>
                                </div>
                              
                                <div className="card-body">
                                  <div className="row">
                                    <div className="col-md-2">
                                    
                                        
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                             
                      </>                    
                    )
                  })
                  :
                  <>
                    <h2 className='text-center'>
                      { errors ? 'Login to Review' : <Spinner />}
                    </h2> 
                  </>
                }
              </Container>
              { userIsAuthenticated()  ? 
                <Link to={`/add-review/${playId}`}>
                  {/* <button className='back-button btn btn-primary'>Add a review</button> */}
                </Link>
                :
                <Link to={'/'}>
                  <button className='btn btn-primary'>Login to add a review</button>
                </Link>
              }     
            </>
            :
            <h2 className='text-center'>
              { errors ? 'Something went wrong. Please try again later' : <Spinner />}
            </h2> 
          }
          <Form onSubmit={handleSubmitReview}>
            <div className='mb-4 w-100 h-1/2 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 pt-2'>
              <div className='py-2 px-4 bg-white rounded-t-lg dark:bg-gray-600'>
                <label htmlFor='comment' className='sr-only'>Your Review</label>
                <textarea id='comment' rows='4' className=' w-100 px-0 w-full text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400' name='text' value={formData.text} maxLength='280' onChange={handleChange} placeholder='Write a comment...' required></textarea>
              </div>
              <div className='flex justify-between items-center py-2 px-3 border-t dark:border-gray-600 '>
                <button type="submit" value="Add Comment" name={playId} required className=" btn btn-primary inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                Post Review
                </button>
              </div>
            </div>
          </Form>
        </Row>
      </Container>
      
    </>
  )
}

export default TheatreSingle