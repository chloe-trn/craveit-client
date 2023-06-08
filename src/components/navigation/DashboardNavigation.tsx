import { Link } from 'react-router-dom'
import List from '../generic/List'

interface NavigationItem {
  name: string
  path?: string
}
  
const DashboardNavigation = () => {

  // Define navigation items available from dashboard
  const navigationItems: NavigationItem[] = [
    {
      name: 'Home', 
      path: '/home'
    }, 
    {
      name: 'Quiz', 
      path: '/quiz'
    },
    {
      name: 'Past Results', 
      path: '/past-results'
    }
  ]

  return (
    <aside>
      <nav data-testid='navigation' className='nav'>
        <List 
          items={navigationItems} 
          render={(item: NavigationItem) => (
            item.path ? (
              <Link to={item.path}>{item.name}</Link>
            ) : (
              <span>{item.name}</span>
            )
          )}
        />
      </nav>
    </aside>
  )
}

export default DashboardNavigation