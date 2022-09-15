
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Landing = () => {

  const buttons = [
    {
      label: 'Register',
      path: '/register',
    },
    {
      label: 'Login',
      path: '/login',
    }
  ]

  return (
    <>
      <main className="hero text-center">
        <div className="hero-container">
          <h1 className='display-3'>Welcome to the Theatre Review Page</h1>
          <Link to='/theatre'>
            <Button>Explore the Uk theatre</Button>
          </Link>
          <p className='lead'>To  add reviews, please register below or login</p>
          {buttons.map((button, index) => (
            <Link key={index} to={button.path}>
              <button>{button.label}</button>
            </Link>
          ))}
          
        </div>
      </main>
    </>
  )
}

export default Landing