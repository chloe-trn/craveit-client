import { rest, RestRequest, ResponseComposition, RestContext } from 'msw'
import { setupServer } from 'msw/node'
import { 
  mockLoginUserResponse, 
  mockRegisterUserResponse, 
  mockSubmitQuizResponse,
  mockGetResultsResponse 
} from './mock-data'

// set up mock server for testing

const baseUrl = 'https://localhost:7175'

export const handlers = [
  rest.post(`${baseUrl}/api/user/login`, (req: RestRequest, res: ResponseComposition<any>, ctx: RestContext) => {
    return res(
      ctx.status(200),
      ctx.json(mockLoginUserResponse)
    )
  }),
  rest.post(`${baseUrl}/api/user/register`, (req: RestRequest, res: ResponseComposition<any>, ctx: RestContext) => {
    return res(ctx.json(mockRegisterUserResponse))
  }),
  rest.post(`${baseUrl}/api/quizzes`, (req: RestRequest, res: ResponseComposition<any>, ctx: RestContext) => {
    return res(ctx.json(mockSubmitQuizResponse))
  }),
  rest.post(`${baseUrl}/api/results`, (req: RestRequest, res: ResponseComposition<any>, ctx: RestContext) => {
    return res(ctx.status(200))
  }),
  rest.get(`${baseUrl}/api/results`, (req: RestRequest, res: ResponseComposition<any>, ctx: RestContext) => {
    return res(ctx.json(mockGetResultsResponse))
  }),
  rest.delete(`${baseUrl}/api/results/:id`, (req: RestRequest<{ id: string }>, res: ResponseComposition<any>, ctx: RestContext) => {
    return res(ctx.status(204))
  }),
]

export const server = setupServer(...handlers)