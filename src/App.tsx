import './assets/css/App.css'
import { Link, Outlet, useLocation } from 'react-router-dom'
import Navigation from './components/navigation/Navigation'
import Heading from './components/generic/Heading'

const App = () => {
  const { pathname } = useLocation()
  const initialPaths: string[] = ['/', '/login', '/register']

  return (
    <div data-testid='app' className='app initial'>
      <header className='header'>
        <Heading title={'TasteBud'}/>
      </header>
      {!initialPaths.includes(pathname) && <Navigation />}
      <main data-testid='main' className='main'>
        {['/'].includes(pathname) && (
          <div className='btn-wrapper'>
            <Link to='register' data-testid='register-btn' className='register btn'>Register</Link>
            <Link to='login' data-testid='login-btn' className='register btn'>Login</Link>
          </div>
        )}
        <Outlet />
      </main>
      {/** TODO: Add footer */}
    </div>
  )
}

export default App


