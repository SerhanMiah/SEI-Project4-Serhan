import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
const NotFound = () => {
  return (
    <Container className='main-notFound'>
      <h1>404 Page Not Found</h1>
      <Link to="/">Back to home</Link>
    </Container>
  )
}

export default NotFound