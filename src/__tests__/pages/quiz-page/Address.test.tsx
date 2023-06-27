import { fireEvent } from '@testing-library/react'
import { render, screen } from '../../../test-utils/render-util'
import { mockQuizState } from '../../../test-utils/mock-data'
import Address from '../../../pages/quiz-page/questions/Address'

const mockOnNext = jest.fn()
const mockOnReset = jest.fn()

describe('Address', () => {
  it('should enable the next button when all required fields are filled out', () => {
    // arrange and act
    render(<Address quizState={mockQuizState} onNext={mockOnNext} onReset={mockOnReset}/>)

    fireEvent.change(screen.getByLabelText('Street Address'), { target: { value: '123 Test St' } })
    fireEvent.change(screen.getByLabelText('City'), { target: { value: 'Test City' } })
    fireEvent.change(screen.getByLabelText('State'), { target: { value: 'Test State' } })
    fireEvent.change(screen.getByLabelText('Zip Code'), { target: { value: '12345' } })

    const nextButton = screen.getByText('Next')
  
    // assert
    expect(nextButton).toBeEnabled()
  })
  
  it('should disable the next button when any required field is empty', () => {
    // arrange and act
    render(<Address quizState={mockQuizState} onNext={mockOnNext} onReset={mockOnReset}/>)

    fireEvent.change(screen.getByLabelText('Street Address'), { target: { value: '123 Test St' } })
    fireEvent.change(screen.getByLabelText('City'), { target: { value: '' } })
    fireEvent.change(screen.getByLabelText('State'), { target: { value: 'Test State' } })
    fireEvent.change(screen.getByLabelText('Zip Code'), { target: { value: '12345' } })

    const nextButton = screen.getByText('Next')
  
    // assert
    expect(nextButton).toBeDisabled()
  })

  it('should call handleReset once when the reset button is clicked', () => {
    // arrange and act
    render(<Address quizState={mockQuizState} onNext={mockOnNext} onReset={mockOnReset}/>)
    
    fireEvent.click(screen.getByText('Reset'))

    // assert
    expect(mockOnReset).toHaveBeenCalledTimes(1)
  })
})