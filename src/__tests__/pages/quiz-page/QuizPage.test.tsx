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
})