import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useParams } from 'react-router-dom'


import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'
import  Col from 'react-bootstrap/Col'

import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap'

import { getToken } from '../helpers/auth'

const EditProfile = () => {

  const { userId } = useParams()
  const navigate = useNavigate()
  const [ imageSelect, setImageSelected ] = useState('')
  const [ errors, setErrors ] = useState(false)
  const [ userProfile, setUserProfile ] = useState('')
  const [ updatedUserProfile, setUpdatedUserProfile ] = useState('')
  const [ newProfileImg, setNewProfileImg ] = useState('')

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(`api/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        setUserProfile(data)
        // console.log(setUserProfile)
        // setUpdatedUserProfile(data)
      } catch (error) {
        setErrors(error.message)
        console.log(error.message)
      }
    }
    getUser()
  }, [userId])

  useEffect(() => {
  }, [newProfileImg])

  const handleChange = (event) => {
    setUpdatedUserProfile({ ...updatedUserProfile, [event.target.name]: event.target.value })
    setErrors({ ...errors, [event.target.name]: '', message: '' })
  }

  // const uploadImage = async (event) => {
  //   event.preventDefault()
  //   const formData = new FormData()
  //   formData.append('file', imageSelect)
  //   formData.append('upload_preset', 'djssiss0') //? djssiss0 is the key + danedskby is the name 
  //   const { data } = await axios.post('https://api.cloudinary.com/v1_1/danedskby/image/upload', formData)
  //   // ! this is my (serhan miah) login for the cloudinary - for destination images
  //   setNewProfileImg(data.url)
  //   setUpdatedUserProfile({ ...updatedUserProfile, profileImg: data.url })
  // }

  // const handleSubmit = async (event) => {
  //   event.preventDefault()
  //   try {
  //     const { data } = await axios.put(`api/auth/profile/${userId}`, updatedUserProfile, {
  //       headers: {
  //         Authorization: `Bearer ${getToken()}`,  
  //       },
  //     })
  //     console.log(data)
  //     navigate(`/profile/${userId}`)
  //   } catch (error) {
  //     setErrors(error.message)
  //     console.log(error.message)
  //   }
  // } 

  return (
    <main className="edit-user-page">  
      <Container className='editUserContainer'>
        <h1>This is the edit profile page!</h1>


      </Container>
    </main>
  )
}

export default EditProfile