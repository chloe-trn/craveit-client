import { Link } from 'react-router-dom'
import List from '../generic/List'
import routes from '../../routes'

interface NavigationItem {
  name: string
  path?: string
}
  
const Navigation = () => {
  
  const navigationItems: NavigationItem[] = routes.map((route) => ({
    name: route.name,
    path: route.path,
  }));

  return (
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
  )
}

export default Navigation