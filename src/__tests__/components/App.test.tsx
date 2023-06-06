import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../../App'

const renderApp = (initialEntries: string[]) => {
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
}

describe('App', () => {
  test('does not render navigation elements when path is an initial page', () => {
    // arrange and act
    renderApp(['/'])

    const navigationElement = screen.queryByTestId('navigation') 
    const registerLink = screen.getByTestId('register-btn')
    const loginLink = screen.getByTestId('login-btn')

    // assert
    expect(navigationElement).not.toBeInTheDocument()
    expect(registerLink).toBeInTheDocument()
    expect(loginLink).toBeInTheDocument()
  })

  test('renders navigation elements when path is not one of the initial paths', () => {
    // arrange and act
    renderApp(['/about'])

    const navigationElement = screen.getByTestId('navigation')
    const registerLink = screen.queryByTestId('register-btn')
    const loginLink = screen.queryByTestId('login-btn')

    // assert
    expect(navigationElement).toBeInTheDocument()
    expect(registerLink).not.toBeInTheDocument()
    expect(loginLink).not.toBeInTheDocument()
  })
})
