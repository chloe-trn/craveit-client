import { render, screen, fireEvent } from '@testing-library/react'
import HamburgerButton from '../../../components/navigation/hamburger-button/HamburgerButton'

describe('HamburgerButton', () => {
  it('should call onClick when clicked', () => {
    // arrange
    const onClickMock = jest.fn()
    const menuOpen = false

    // act
    render(<HamburgerButton onClick={onClickMock} menuOpen={menuOpen} />)
    const button = screen.getByRole('button')

    fireEvent.click(button)

    // assert
    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  it('should have proper aria-expanded="true" when menu is open', () => {
    // arrange
    const onClickMock = jest.fn()
    const menuOpen = true

    // act
    render(<HamburgerButton onClick={onClickMock} menuOpen={menuOpen} />)
    const button = screen.getByRole('button')

    // assert
    expect(button).toHaveAttribute('aria-controls', 'nav')
    expect(button).toHaveAttribute('aria-expanded', 'true')
  })

  it('should have proper aria-expanded="false" when menu is open', () => {
    // arrange
    const onClickMock = jest.fn()
    const menuOpen = false

    // act
    render(<HamburgerButton onClick={onClickMock} menuOpen={menuOpen} />)
    const button = screen.getByRole('button')

    // assert
    expect(button).toHaveAttribute('aria-controls', 'nav')
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })
})