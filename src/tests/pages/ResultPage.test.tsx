import { rest, RestRequest, ResponseComposition, RestContext } from 'msw'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { fireEvent } from '@testing-library/react'
import { render, screen } from '@testing-library/react'
import { store } from '../../redux/store'
import { server } from '../../tests/utils/mock-server'
import { mockResultData } from '../../tests/utils/mock-data'
import { clientApi } from '../../redux/clientApi'
import ResultPage from '../../pages/result-page/ResultPage'

jest.mock('mapbox-gl')

describe('ResultPage', () => {
  beforeAll(() => server.listen())
  afterAll(() => server.close())
  afterEach(() => {
    server.resetHandlers()
    store.dispatch(clientApi.util.resetApiState())
  })

  describe('quiz data populating on page', () => {
    it('renders quiz data correctly when not null', () => {
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

    it('renders error message when quiz data is null', () => {
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
  
      // assert 
      expect(screen.getByText(/Please complete the questionnaire before we can find a matching restaurant for you/i)).toBeInTheDocument()
    })
  })

  describe('save spot', () => {
    it('save spot successfully', async () => {
      // arrange 
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
  
      // act
      fireEvent.click(screen.getByText('Save This Spot'))
      
      // assert
      expect(await screen.findByText(/loading.../i)).toBeInTheDocument()
      expect(await screen.findByText('This craving has been saved.')).toBeInTheDocument() 
      expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument()
    })

    it('fails to save spot', async () => {
      // arrange
      server.use(
        rest.post(`${process.env.REACT_DEV_SERVER_URL}/api/results`, (req: RestRequest, res: ResponseComposition<any>, ctx: RestContext) => {
          return res(ctx.status(500))
        }),
      )
  
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
  
      // act
      fireEvent.click(screen.getByText('Save This Spot'))
      
      // assert
      expect(await screen.findByText(/loading.../i)).toBeInTheDocument()
      expect(await screen.findByText('Something went wrong, please try again.')).toBeInTheDocument() 
      expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument()
    })
  })
})