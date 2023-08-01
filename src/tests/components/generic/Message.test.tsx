import { render, screen } from '@testing-library/react'
import Message from '../../../components/generic/Message'

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon }: { icon: any }) => (
    <i data-testid='fa-icon' className={`fa-${icon}`} aria-hidden='true'></i>
  )
}))

describe('Message', () => {
  it('should render the message with the correct text and icon', () => {
    // arrange
    const className = 'message'
    const icon = 'check-circle'
    const text = 'Mock message'

    // act
    render(<Message className={className} icon={icon} text={text} />)

    // assert
    const messageElement = screen.getByText(text)
    expect(messageElement).toBeInTheDocument()
    expect(messageElement).toHaveClass(className)

    const iconElement = screen.getByTestId('fa-icon')
    expect(iconElement).toBeInTheDocument()
    expect(iconElement).toHaveClass(`fa-${icon}`)
    expect(iconElement).toHaveAttribute('aria-hidden', 'true')    
  })
})