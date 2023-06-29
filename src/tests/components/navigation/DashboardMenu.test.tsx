import { render, screen } from '../../utils/custom-render'
import DashboardMenu from '../../../components/navigation/DashboardMenu'

describe('DashboardMenu', () => {
  it('renders the correct number of navigation items with the correct name and link', () => {
    // arrange and act
    render(<DashboardMenu />)
    const navigation = screen.getByTestId('navigation')

    // assert
    expect(navigation).toBeInTheDocument()
  })
})
