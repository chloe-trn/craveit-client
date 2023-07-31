import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '../../redux/store'
import { setUser } from '../../redux/slices/authSlice'
import App from '../../App'

const renderApp = (initialEntries: string[]) => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={initialEntries}>
        <App />
      </MemoryRouter>
    </Provider>
  )
}

describe('App', () => {
  it('does not render navigation elements when path is an initial page', () => {
    // arrange and act
    renderApp(['/'])

    const navigationElement = screen.queryByTestId('navigation') 
    const registerLink = screen.getByTestId('register-btn')

    // assert
    expect(navigationElement).not.toBeInTheDocument()
    expect(registerLink).toBeInTheDocument()
  })

  it('renders navigation elements when path is not one of the initial paths and the user is logged in', () => {
    // arrange
    store.dispatch(setUser({ username: 'mock_username', token: 'mock_token', expiration: 'mock_expiration' }))

    // act
    renderApp(['/home'])

    const navigationElement = screen.getByTestId('navigation')
    const registerLink = screen.queryByTestId('register-btn')
    const loginLink = screen.queryByTestId('login-btn')

    // assert
    expect(navigationElement).toBeInTheDocument()
    expect(registerLink).not.toBeInTheDocument()
    expect(loginLink).not.toBeInTheDocument()
  })
})