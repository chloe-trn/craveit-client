import './assets/css/App.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuth, setUser, logOut } from './services/auth/authSlice'
import { selectMenu, toggleMenu, closeMenu } from './services/menu/menuSlice'
import AppRoutes from './components/navigation/AppRoutes'
import Heading from './components/generic/Heading'
import HamburgerButton from './components/navigation/hamburger-button/HamburgerButton'
import DashboardMenu from './components/navigation/dashboard-menu/DashboardMenu'

const App = () => {
  const dispatch = useDispatch()
  const userDetails = useSelector(selectAuth)
  const { menuOpen } = useSelector(selectMenu)

  const handletoggleMenu = () => {
    // Open/close the mobile menu when the user clicks on the hamburger button
    dispatch(toggleMenu())
  }
  
  const handlePopState = () => {
    // Close the mobile menu when the user loads a page 
    dispatch(closeMenu())
  }

  useEffect(() => {
    // Get user details from local storage
    const storedUserDetails = JSON.parse(localStorage.getItem('tastebud_user') || '{}')
    
    // Check if token and expiration are present
    if (storedUserDetails.token && storedUserDetails.expiration) {
      const expirationDate = new Date(storedUserDetails.expiration)

      // Check if token has expired 
      if (expirationDate < new Date()) {
        dispatch(logOut()) // If it has expired, log the user out 
      } else {
        // Update user details in the Redux store
        dispatch(setUser(storedUserDetails))
      }
    }

    // Listen to if the user navigates to another page 
    window.addEventListener('popstate', handlePopState)

    // Clean up the listener
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [dispatch])

  const appClassName = userDetails?.token ? 'app auth' : 'app initial'

  return (
    <div id='app' className={appClassName}>
        <header className={`header ${menuOpen ? 'open' : 'close'}`}>
          <div className='wrapper'>
            <div className='header-content'>
              <Heading title={'TasteBud'}/>
              <HamburgerButton onClick={handletoggleMenu} menuOpen={menuOpen} />
            </div>
            {userDetails?.token && <DashboardMenu />}
          </div>
        </header>
        <div className='inner-wrapper'>
          <main data-testid='main' className='main'>
            <div className='wrapper'>
              <AppRoutes />
            </div>
          </main>
          <footer className='footer'>
            <div className='wrapper'>
              TasteBud 2023.
            </div>
          </footer>
      </div>
    </div>
  )
}

export default App