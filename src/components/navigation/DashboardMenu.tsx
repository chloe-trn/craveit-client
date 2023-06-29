import { ReactNode} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logOut } from '../../redux/slices/authSlice'
import { toggleMenu } from '../../redux/slices/menuSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseChimneyUser, faUtensils, faRectangleList, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import List from '../generic/List'

type NavigationItem = {
  name: string
  path?: string
  icon?: ReactNode
  onClick?: () => void,
}

const DashboardMenu = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLinkClick = () => {
    dispatch(toggleMenu())
  }

  const handleLogout = () => {
    dispatch(logOut())
    navigate('/auth')
  }

  // Define navigation items available from dashboard
  const navigationItems: NavigationItem[] = [
    {
      name: 'Home',
      path: '/home',
      icon: <FontAwesomeIcon icon={faHouseChimneyUser} />
    },
    {
      name: 'Satisfy Your Craving',
      path: '/questionnaire',
      icon: <FontAwesomeIcon icon={faUtensils} />
    },
    {
      name: 'Saved Cravings',
      path: '/saved-results',
      icon: <FontAwesomeIcon icon={faRectangleList} />
    },
    {
      name: 'Logout',
      icon: <FontAwesomeIcon icon={faRightFromBracket} />,
      onClick: handleLogout,
    },
  ]

  return (
    <nav data-testid='navigation' id='nav' className='nav'>
      <List
        items={navigationItems}
        render={(item: NavigationItem) =>
          item.path ? (
            <Link to={item.path} onClick={handleLinkClick}>{item.icon}{item.name}</Link>
          ) : (
            <button onClick={item.onClick}>{item.icon}{item.name}</button>
          )
        }
      />
    </nav>
  )
}

export default DashboardMenu