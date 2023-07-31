import { fireEvent } from '@testing-library/react'
import { render, screen } from '../utils/custom-render'
import QuizPage from '../../pages/QuizPage'

jest.mock('@mapbox/search-js-react', () => ({
  AddressAutofill: (props: any) => (
    <input
      id='street'
      placeholder='start typing your address, e.g. 123 Main...'
      autoComplete='address-line1'
      onChange={(e) => props.onRetrieve({ features: [] })} 
      required
    />
  ),
  AddressMinimap: jest.fn(), 
  config: { accessToken: 'mock_access_token' },
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
    fireEvent.change(screen.getByLabelText('Street'), { target: { value: '123 Test St' } })
    fireEvent.change(screen.getByLabelText('City'), { target: { value: 'Test City' } })
    fireEvent.change(screen.getByLabelText('State'), { target: { value: 'Test State' } })
    fireEvent.change(screen.getByLabelText('Zipcode'), { target: { value: '12345' } })
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