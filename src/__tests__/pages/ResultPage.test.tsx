import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '../../app/redux-store'
import ResultPage from '../../pages/result-page/ResultPage'

jest.mock('mapbox-gl');

const mockQuizData = {
  name: 'Restaurant Name',
  rating: 4.5,
  categories: [
    { alias: 'test category 1', title: 'Test Category 1' },
    { alias: 'test category 2', title: 'Test Category 2' },
  ],
  phone: '123-456-7890',
  url: 'https://test.com',
  coordinates: {
    longitude: 0,
    latitude: 0,
  },
  distance: 3873
}

describe('ResultPage', () => {
  test('renders quiz data correctly when not null', () => {
    // arrange and act
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[{ 
          pathname: '/',
          state: { quizData: mockQuizData }
        }]}>
          <ResultPage />
        </MemoryRouter>
      </Provider>
    )

    // assert
    expect(screen.getByText(mockQuizData.name)).toBeInTheDocument()
    expect(screen.getByText(mockQuizData.rating.toString())).toBeInTheDocument()
    expect(screen.getByText(mockQuizData.phone)).toBeInTheDocument()

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