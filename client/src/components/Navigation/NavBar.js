
import Nav from 'react-bootstrap/Nav'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { userIsAuthenticated } from '../../components/helpers/auth'


const NavBar = () => {
  const navigate = useNavigate()


  const handleLogOut = () => {
    window.localStorage.removeItem('local-user-Token')
    // window.localStorage.removeItem('local-user-Id')
    navigate('/')
  }

  return (
    <Nav variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }} as={Link} to='/' >Home</Nav.Link> 
      </Nav.Item>
      
      <Nav.Item>
        <Nav.Link style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }} as={Link} to='/theatre' >All theatre</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }} as={Link} to='/edit-profile/:userId' >user profile</Nav.Link>
      </Nav.Item>
     
      { userIsAuthenticated()
        ?
        <>
          <Nav.Item>
            <Nav.Link style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }} as={Link} to='/profile/' >User Profile</Nav.Link>
          </Nav.Item>
          {/* <Nav.Item>
            <Nav.Link style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }} as={Link} to='/theatre/new' >need to add function</Nav.Link>
          </Nav.Item> */}
          <Nav.Item>
            <Nav.Link style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }}  onClick={handleLogOut}>Logout</Nav.Link>
          </Nav.Item>
        </>
        :
        <>
          <Nav.Item>
            <Nav.Link style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }} as={Link} to='/register'>Register</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }} as={Link} to='/login'>Login</Nav.Link>
          </Nav.Item>
        </>      
      }      
    </Nav>
  )
}
  
  
export default NavBar