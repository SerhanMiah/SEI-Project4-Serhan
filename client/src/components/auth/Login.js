import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import { setId, setToken } from '../helpers/auth'
import { useNavigate } from 'react-router-dom'


const Login = () => {
  const navigate = useNavigate() 

  const [ loginData, setLoginData ] = useState({
    email: '',
    password: '',
  })
  const [ errors, setErrors ] = useState(false)


  const handleChange = (event) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value  })
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post('api/auth/login/', loginData)
      console.log(data)
      setToken(data.token)
      setId(data.userId)
      navigate('/theatre')
    } catch (error) {
      setErrors(error.message)
      console.log(error.message)
    }
  }


  return (     
    <main className='form-login justify-content-center'>
      <Form onSubmit={onSubmit} className='login-form'>
        <h1>Login</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>email</Form.Label>
          <Form.Control type='email' name='email' placeholder='email' onChange={handleChange} value={loginData.email} />   
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' name='password' placeholder='Password' onChange={handleChange} value={loginData.password} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
        {errors && <div className='error'>{errors}</div>}
      </Form>
    </main>     
  )
}

export default Login

