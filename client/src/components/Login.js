import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'



const Login = () => {
  return (     
    <main className='form-login justify-content-center'>
      <Form className='login-form'>
        <h1>Login</h1>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>User Name</Form.Label>
          <Form.Control type='text' name='userName' placeholder='Username' />   
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' name='password' placeholder='Password' />
        </Form.Group>

        <Button variant='primary' type='submit'>
        Submit
        </Button>
      </Form>
    </main>    
  )
}

export default Login

