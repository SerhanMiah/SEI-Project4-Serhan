import axios from 'axios'
import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useNavigate, useParams } from 'react-router-dom'

import { getToken } from '../helpers/auth'



// ! need to change this page


const EditReview = () => {
  const { playId, reviewId } = useParams()

  const [ formData, setFormData ] = useState({
    text: '',
    theatre: parseInt(playId),

  })
  const [ theatre, setTheatre ] = useState(null)
  const [ reviews, setReviews ] = useState([])

  const [ owner, setOwner ] = useState([])
  const [ update, setUpdate ] = useState([])

  const [ updatedReview, setUpdatedReview ] = useState('')


  const navigate = useNavigate()

  const [ errors, setErrors ] = useState(false)


  useEffect(() => {
    const getData = async () => {

      try {
        const { data } = await axios.get(`/api/venue/${playId}/`)
        // console.log(data)

        setTheatre(data)
        // console.log('this is the review ---->', data.review[0].id)
        setReviews(data.review)
        // setOwner(data.owner)
        setUpdatedReview(data)
        
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
      const { data } = await axios.put(`/api/review/${reviewId}/`, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })

      console.log('data ------>', data)
      setFormData({ text: '', theatre: '', owner: '' })
      setTheatre(data)
      console.log(setReviews)
      // window.location.reload()
      navigate(`/theatre/${playId}`)
    } catch (error) {
      console.log(error)
      // setErrors(error)
    }
  }

  const handleChange = async (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
    setErrors({ ...errors, [event.target.name]: '', message: '' })
  }

  return (
    <main className="add-review-page justify-content-center">
      <Form className="review-form" onSubmit={handleSubmitReview}>
        <h1>Edit Review</h1>

        <Form.Group>
          <Form.Label htmlFor="reviewText" >Review Text</Form.Label>          
          <Form.Control as="textarea" rows={4} name='text' value={updatedReview.text} placeholder="Type Review Here"  onChange={handleChange} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>        
        {/* { errors && <p className='text-danger'>{errors}</p>} */}
      </Form>
    </main>
  )
}

export default EditReview