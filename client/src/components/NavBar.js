import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link, useNavigate } from 'react-router-dom'


function NavBar() {
  return (
    <Nav variant='tabs' defaultActiveKey='/home'>
      <Nav.Item>
        <Navbar.Brand as={Link} to="/">🌍</Navbar.Brand>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }} as={Link} to='/' >Home</Nav.Link> 
      </Nav.Item>
      <Nav.Item>
        <Nav.Link style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }} as={Link} to='/theatre'>All theatre</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }} as={Link} to='/register'>register</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }} as={Link} to='/login'>login</Nav.Link>
      </Nav.Item>
    </Nav>
  )
}

export default NavBar