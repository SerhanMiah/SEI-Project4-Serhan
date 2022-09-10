import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { userIsAuthenticated } from '../helpers/auth'
import Container from 'react-bootstrap/Container'


function NavBar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    window.localStorage.removeItem('local-user-Token')
    navigate('/login')
  }
  
  return (
    <Navbar expand="sm">
      <Container as="section">
        <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>

        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>


          <Nav.Link as={Link} to="/theatre">All theatre</Nav.Link>
          { userIsAuthenticated()
            ?
            <>
              <Nav.Link as={Link} to="/theatre/new">Add a new Theatre</Nav.Link>
              <span onClick={handleLogout}>Logout</span>
            </>
            :
            <>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar