import { render, screen } from '../../test-utils/render-util'
import { store } from '../../redux/store'
import { setUser } from '../../redux/slices/authSlice'
import DashboardPage from '../../pages/dashboard-page/DashboardPage'

describe('DashboardPage', () => {
  it('renders correct username in the text', () => {
    // arrange
    store.dispatch(setUser({ username: 'mock_username', token: 'mock_token', expiration: 'mock_expiration' }))
    // act
    render(<DashboardPage />)
    // assert
    expect(screen.getByText(`Hey there, mock_username`)).toBeInTheDocument()
  })

  it('button takes the user to "/questionnaire" page', () => {
    // arrange
    store.dispatch(setUser({ username: 'mock_username', token: 'mock_token', expiration: 'mock_expiration' }))
    // act
    render(<DashboardPage />)
    const button = screen.getByText('Take the Questionnaire')
    // assert
    expect(button).toBeInTheDocument()
    expect(button.closest('a')).toHaveAttribute('href', '/questionnaire')
  })
})