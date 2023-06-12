import { render, screen } from '../../../test-utils/render-util'
import DashboardMenu from '../../../components/navigation/dashboard-menu/DashboardMenu'

describe('DashboardMenu', () => {
  test('renders the correct number of navigation items with the correct name and link', () => {
    // arrange
    const expectedItems = [
        { name: 'Home', path: '/home' },
        { name: 'Quiz', path: '/quiz' },
        { name: 'Past Results', path: '/past-results' }
    ]

    // act
    render(<DashboardMenu />)
    const navigationItems = screen.getAllByRole('link')

    // assert
    expect(navigationItems).toHaveLength(3) 
    navigationItems.forEach((item, index) => {
      expect(item).toHaveTextContent(expectedItems[index].name)
      expect(item).toHaveAttribute('href', expectedItems[index].path)
    })
  })
})
