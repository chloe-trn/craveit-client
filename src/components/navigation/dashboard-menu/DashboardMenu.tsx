import './dashboard-menu.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logOut } from '../../../services/auth/authSlice'
import { toggleMenu } from '../../../services/menu/menuSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseChimneyUser, faCircleQuestion, faRectangleList, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import List from '../../generic/List'
import { ReactNode} from 'react'

interface NavigationItem {
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
      name: 'Quiz',
      path: '/quiz',
      icon: <FontAwesomeIcon icon={faCircleQuestion} />
    },
    {
      name: 'Past Results',
      path: '/past-results',
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