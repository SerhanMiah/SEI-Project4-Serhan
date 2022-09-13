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

  const { playId } = useParams()
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
      setFormData({ text: '', theatre_id: '', owner: '' })
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
                <Link to='/locations' className='btn dark'>Back to all Locations</Link>
              </Col>

              {/* COMMENTS SECTION */}
              <form onSubmit={handleSubmitReview} >
                <div className='grid grid-cols-3'>
                  <div className='col-span-2'>
                    <div className={update && owner === reviews.owner ? 'review-display hide' : 'review-display'}>
                      <h3>Reviews</h3>
                      { reviews.length > 0
                        ?
                        reviews.map(review => {
                          const { id, owner, text } = review
                          return (                       
                            <div key={review.id} data-bs-spy='scroll' data-bs-target='#scrollspy1' data-bs-offset='200' className='scrollspy-example'>
                              
                              <div>
                                <h3 className='text-xl font-semibold pt-5 pb-3'>{review.owner.username}</h3>
                                <p>
                                  {review.text}
                                </p>                 
                        
                              
                                <div className="buttons">
                      
                                </div>
                                
                                <div className='mb-4 w-full bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600'>
                                  <div className='py-2 px-4 bg-white rounded-t-lg dark:bg-gray-800'>
                                    <label htmlFor='comment' className='sr-only'>Your comment</label>
                                    <textarea id='comment' rows='4' className='px-0 w-full text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400' name='text' value={formData.text} maxLength='280' onChange={handleChange} placeholder='Write a comment...' required></textarea>
                                  </div>
                                  <div className='flex justify-between items-center py-2 px-3 border-t dark:border-gray-600'>
                                    <Button type='submit' value='Add Comment' required className='inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800'>
                                            Post Review
                                    </Button>
                                    <Button name={review.id} onClick={deleteReview}> 
                                      Delete
                                    </Button>
                                    {/* {owner === reviews.owner ? ( */}
                                    <Button name={reviews.id} value={event.target.name} onClick={handleEdit}>
                                      Edit
                                    </Button>
                                    {/* ) : (
                                      <></> */}
                                    {/* )} */}
                                    {owner === reviews.owner ? (
                                      <Button name={reviews.id} onClick={deleteReview}>
                                        🗑
                                      </Button>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                    
                                
                                </div>
                              </div>
                            </div>          
                          )
                        })
                        :
                        <>
                          { errors ? <h2>Something went wrong.</h2> : <p>Loading</p>}
                        </>
                      }
                    </div>
                  </div>               
                </div>
              </form>
        

         
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