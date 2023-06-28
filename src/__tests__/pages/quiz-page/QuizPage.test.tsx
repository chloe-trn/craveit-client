import { fireEvent } from '@testing-library/react'
import { render, screen } from '../../../test-utils/render-util'
import QuizPage from '../../../pages/quiz-page/QuizPage'

jest.mock('@mapbox/search-js-react', () => ({
    AddressAutofill: jest.fn(),
    AddressMinimap: jest.fn(),
    config: { accessToken: 'mock_access_token'}
}))

describe('QuizPage', () => {
  it('should render first quiz question with reset and next button', () => {
    // arrange and act 
    render(<QuizPage />)
    const addressQuestion = screen.getByText('What\'s your current location?')
    const resetButton = screen.getByText('Reset')
    const nextButton = screen.getByText('Next')

    // assert
    expect(addressQuestion).toBeInTheDocument()
    expect(resetButton).toBeInTheDocument()
    expect(nextButton).toBeInTheDocument()
  })

  it('should progress through the quiz properly', () => {
    // arrange and act
    render(<QuizPage />)

    // assert

    // address question
    fireEvent.change(screen.getByLabelText('Street Address'), { target: { value: '123 Test St' } })
    fireEvent.change(screen.getByLabelText('City'), { target: { value: 'Test City' } })
    fireEvent.change(screen.getByLabelText('State'), { target: { value: 'Test State' } })
    fireEvent.change(screen.getByLabelText('Zip Code'), { target: { value: '12345' } })
    fireEvent.click(screen.getByText('Next'))

    // distance question
    fireEvent.click(screen.getByLabelText('10 miles'))
    fireEvent.click(screen.getByText('Next'))

    // cuisine question
    fireEvent.click(screen.getByLabelText('Thai'))
    fireEvent.click(screen.getByText('Next'))

    // price range question 
    fireEvent.click(screen.getByLabelText('$11-$30'))
    const submitButton = screen.getByText('Submit')
    expect(submitButton).toBeEnabled()

    fireEvent.click(screen.getByText('Submit'))
  })
})