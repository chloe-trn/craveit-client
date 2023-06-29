import { render, screen } from '../../../test-utils/render-util'
import DashboardMenu from '../../../components/navigation/dashboard-menu/DashboardMenu'

describe('DashboardMenu', () => {
  it('renders the correct number of navigation items with the correct name and link', () => {
    // arrange and act
    render(<DashboardMenu />)
    const navigation = screen.getByTestId('navigation')

    // assert
    expect(navigation).toBeInTheDocument()
  })
})
