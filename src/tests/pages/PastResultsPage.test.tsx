import { rest, RestRequest, ResponseComposition, RestContext } from 'msw'
import { fireEvent } from '@testing-library/react'
import { render, screen } from '../utils/custom-render'
import { store } from '../../redux/store'
import { server } from '../utils/mock-server'
import { clientApi } from '../../redux/clientApi'
import PastResultsPage from '../../pages/PastResultsPage'

describe('PastResultsPage', () => {
  beforeAll(() => server.listen())
  afterAll(() => server.close())
  afterEach(() => {
    server.resetHandlers()
    store.dispatch(clientApi.util.resetApiState())
  })

  describe('get results successfully', () => {
    it('renders table if results are available', async () => {
      // arrange and act
      render(<PastResultsPage />)
  
      // assert
      expect(screen.getByText(/loading.../i)).toBeInTheDocument()
      expect(await screen.findByRole('table')).toBeInTheDocument() 
      expect(screen.getAllByRole('row')).toHaveLength(3)
      expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument()
    })
    
    describe('delete functionality', () => {
      it('successfully delete item', async () => {
        // arrange 
        render(<PastResultsPage />)
        expect(await screen.findByRole('table')).toBeInTheDocument()

        // act
        const deleteButtons = screen.getAllByRole('button', { name: /delete/i })
        fireEvent.click(deleteButtons[0])

        // assert
        expect(await screen.findByText('Item deleted.')).toBeInTheDocument()  
      })
    
      it('unsuccessfully delete item', async () => {
        // arrange 
        server.use(
          rest.delete('https://localhost:7175/api/results/:id', (req: RestRequest<{ id: string }>, res: ResponseComposition<any>, ctx: RestContext) => {
            return res(ctx.status(404))
          }),
        )
        render(<PastResultsPage />)
        expect(await screen.findByRole('table')).toBeInTheDocument()
    
        // act
        const deleteButtons = screen.getAllByRole('button', { name: /delete/i })
        fireEvent.click(deleteButtons[0])

        // assert
        expect(await screen.findByText('Cannot delete this item.')).toBeInTheDocument()   
      })
    })
  })

  describe('does not get results successfully', () => {
    it('renders message when results are not available', async () => {
      // arrange
      server.use(
        rest.get('https://localhost:7175/api/results', (req: RestRequest, res: ResponseComposition<any>, ctx: RestContext) => {
          return res(ctx.status(404))
        }),
      )
  
      // act
      render(<PastResultsPage />)
  
      // assert
      expect(screen.getByText(/loading.../i)).toBeInTheDocument()
      expect(await screen.findByText('No results found.')).toBeInTheDocument()
  
      const questionnaireLink = screen.getByRole('link', { name: 'Take the Questionnaire' })
      expect(questionnaireLink).toBeInTheDocument()
      expect(questionnaireLink).toHaveAttribute('href', '/questionnaire')
      expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument()
    })
  })
})