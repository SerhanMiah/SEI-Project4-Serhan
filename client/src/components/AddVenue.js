// import axios from 'axios'
// import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'

// import { getToken } from '../helpers/auth'
// import Button from 'react-bootstrap/Button'
// import Form from 'react-bootstrap/Form'

// const AddVenue = () => {

//   const navigate = useNavigate()
//   const [ imageSelect, setImageSelected ] = useState('')
//   const [ errors, setErrors ] = useState(false)
//   const [ newImgUrl, setNewImgUrl ] = useState('')
//   const [ newVenue, setNewVenue ] = useState('')

//   useEffect(() => {
//   }, [newImgUrl])

//   const handleChange = (event) => {
//     setNewVenue({ ...newVenue, [event.target.name]: event.target.value })
//     setErrors(true)
//   }


//   // uploading images
//   const uploadImage = async (event) => {
//     event.preventDefault()
//     const formData = new FormData()
//     formData.append('file', imageSelect)
//     formData.append('upload_preset', 'djssiss0') //? djssiss0 is the key + danedskby is the name 
//     const { data } = await axios.post('https://api.cloudinary.com/v1_1/danedskby/image/upload', formData)
//     // ! this is my (serhan miah) login for the cloudinary - for destination images
//     setNewImgUrl(data.url)
//     setNewVenue({ ...newVenue, imgUrl: [ data.url ] })
//   }

//   const handleSubmit = async (event) => {
//     event.preventDefault()
//     try {
//       const { data } = await axios.post('api/venue/', newVenue, {
//         headers: {
//           Authorization: `Bearer ${getToken()}`,  
//         },
//       })
//       console.log(data)
//       navigate('/theatre')
//     } catch (error) {
//       setErrors(error.message)
//       console.log(error)
//     }
//   } 

//   return (
//     <main className="add-destinationForm">
//       <div className="add-form-wrapper">
//         <Form className='add-destination-form'  onSubmit={handleSubmit}>
//           <h1>Add Destination</h1>    
//           <Form.Group className="mb-3" >
//             <Form.Label>Name</Form.Label>
//             {/* name is done  */}
//             <Form.Control type="text" name="name" placeholder="Name of Destination" value={newVenue.name} onChange={handleChange} /> 
//           </Form.Group>
//           <hr />
//           <Form.Group className="mb-3" >
//             <Form.Label>Location</Form.Label>
//             <Form.Control type="text" name="location" placeholder="location" value={newVenue.location} onChange={handleChange} />
//             <hr />
//           </Form.Group>
//           <Form.Group className="mb-3" >
//             <Form.Label>Description</Form.Label>
//             <Form.Control as="textarea" rows={4} name="description" placeholder="Type description here" value={newVenue.description} onChange={handleChange} />        
//           </Form.Group>
//           <hr />

//           <Form.Group className="mb-3" >
//             <Form.Label>Venue</Form.Label>
//             <Form.Control type="text" name="venue" placeholder="insert venue location" value={newVenue.venue} onChange={handleChange} /> 
//           </Form.Group>

//           <hr />
//           {/* image 1 - 3 */}
//           {/* <Form.Group className="upload-image-destinaion mb-3"  >
//             <Form.Label>Image</Form.Label>
//             { newImgUrl ? 
//               <img className='w-100' src={newImgUrl} alt={'User Uploaded Destination'} />
//               :
//               <></>
//             }
//             <input type="file" id="image" className="input" onChange={(event) => {
//               setImageSelected(event.target.files[0])
//             }} /> 
//             <Button onClick={uploadImage}>Upload image</Button>
//           </Form.Group>  */}
//           <Form.Group className="mb-3" >
//             <Form.Label>image one</Form.Label>
//             <Form.Control type="text" name="image_one" placeholder="insert image link " value={newVenue.image_one} onChange={handleChange} /> 
//           </Form.Group>
//           <Form.Group className="mb-3" >
//             <Form.Label>image one</Form.Label>
//             <Form.Control type="text" name="image_two" placeholder="insert image link " value={newVenue.image_two} onChange={handleChange} /> 
//           </Form.Group>
//           <Form.Group className="mb-3" >
//             <Form.Label>image one</Form.Label>
//             <Form.Control type="text" name="image_three" placeholder="insert image link" value={newVenue.image_three} onChange={handleChange} /> 
//           </Form.Group>
          

//           <Form.Group className="mb-3" >
//             <Form.Label>trailer</Form.Label>
//             <Form.Control type="text" name="trailer" placeholder="insert youtube trailer" value={newVenue.trailer} onChange={handleChange} /> 
//           </Form.Group>

//           <Form.Group className="mb-3" >
//             <Form.Label>Genres</Form.Label>
//             <Form.Control type="text" name="genres" placeholder="genres" value={newVenue.genres} onChange={handleChange} />
//             <hr />
//           </Form.Group>

//           <Button className ="button-submit" type="submit">Submit</Button>
//           { errors && <p className='text-danger'>{errors}</p>}
//         </Form>
//       </div>
//     </main>
//   )
// }



// export default AddVenue
