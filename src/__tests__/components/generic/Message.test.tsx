import { render, screen } from '@testing-library/react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Message from '../../../components/generic/Message'

describe('Message', () => {
  it('should render the message with the correct text and icon', () => {
    // arrange
    const className = 'message'
    const icon: IconProp = 'check-circle'
    const text = 'Mock message'

    // act
    render(<Message className={className} icon={icon} text={text} />)

    // assert
    const messageElement = screen.getByText(text)
    expect(messageElement).toBeInTheDocument()

    const iconElement = screen.queryAllByRole('img', { hidden: true })
    expect(iconElement).toBeInTheDocument()
    expect(iconElement).toHaveClass(`fa-${icon}`)
    expect(iconElement).toHaveAttribute('aria-hidden', 'true')

    const messageContainer = screen.getByRole('paragraph', { name: text })
    expect(messageContainer).toHaveClass(className)
  })
})