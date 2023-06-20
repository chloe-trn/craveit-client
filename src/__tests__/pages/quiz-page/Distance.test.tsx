import { fireEvent } from '@testing-library/react'
import { render, screen } from '../../../test-utils/render-util'
import Distance from '../../../pages/quiz-page/questions/Distance'

const mockOnPrevious = jest.fn()
const mockOnNext = jest.fn()
const mockOnReset = jest.fn()

const mockQuizState = {
  location: {
    street: '',
    streetContinued: '',
    city: '',
    state: '',
    zipCode: '',
  },
  distance: '',
  cuisine: [],
  priceRange: [],
}

describe('Distance', () => {
  it('should enable the next button when a distance option is chosen', () => {
    // arrange and act
    render(<Distance quizState={mockQuizState} onPrevious={mockOnPrevious} onNext={mockOnNext} onReset={mockOnReset}/>)

    fireEvent.click(screen.getByLabelText('10 miles'))

    const nextButton = screen.getByText('Next')
  
    // assert
    expect(nextButton).toBeEnabled()
  })
  
  it('should disable the next button when no distance option is chosen', () => {
    // arrange and act
    render(<Distance quizState={mockQuizState} onPrevious={mockOnPrevious} onNext={mockOnNext} onReset={mockOnReset}/>)

    const nextButton = screen.getByText('Next')
  
    // assert
    expect(nextButton).toBeDisabled()
  })

  it('should call handlePrevious once when the previous button is clicked', () => {
    // arrange and act
    render(<Distance quizState={mockQuizState} onPrevious={mockOnPrevious} onNext={mockOnNext} onReset={mockOnReset} />)

    fireEvent.click(screen.getByText('Previous'))

    // assert
    expect(mockOnPrevious).toHaveBeenCalledTimes(1)
  })

  it('should call handleReset once when the reset button is clicked', () => {
    // arrange and act
    render(<Distance quizState={mockQuizState} onPrevious={mockOnPrevious} onNext={mockOnNext} onReset={mockOnReset} />)

    fireEvent.click(screen.getByText('Reset'))

    // assert
    expect(mockOnReset).toHaveBeenCalledTimes(1)
  })
})