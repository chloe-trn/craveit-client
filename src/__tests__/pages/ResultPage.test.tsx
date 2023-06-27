import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '../../app/redux-store'
import { mockResultData } from '../../test-utils/mock-data'
import ResultPage from '../../pages/result-page/ResultPage'

jest.mock('mapbox-gl')

describe('ResultPage', () => {
  test('renders quiz data correctly when not null', () => {
    // arrange and act
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[{ 
          pathname: '/',
          state: { quizData: mockResultData }
        }]}>
          <ResultPage />
        </MemoryRouter>
      </Provider>
    )

    // assert
    expect(screen.getByText(mockResultData.business.name)).toBeInTheDocument()
    expect(screen.getByText(mockResultData.business.rating.toString())).toBeInTheDocument()
    expect(screen.getByText(mockResultData.business.phone)).toBeInTheDocument()

    expect(screen.getByText('test category 1,')).toBeInTheDocument()
    expect(screen.getByText('test category 2')).toBeInTheDocument()
  
    expect(screen.getByText('View on Yelp')).toBeInTheDocument()
    expect(screen.getByText('Find Another Spot')).toBeInTheDocument()
    expect(screen.getByText('Get Directions (2.41 miles away)')).toBeInTheDocument()
  })

  test('renders error message when quiz data is null', () => {
    // arrange and act
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[{ 
          pathname: '/',
          state: { quizData: null }
        }]}>
          <ResultPage />
        </MemoryRouter>
      </Provider>
    )

    // assert category 1
    expect(screen.getByText(/Please complete the questionnaire before we can find a matching restaurant for you/i)).toBeInTheDocument()
  })
})