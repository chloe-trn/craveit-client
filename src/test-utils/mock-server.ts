import { rest, RestRequest, ResponseComposition, RestContext } from 'msw';
import { setupServer } from 'msw/node';
import { mockResults } from './mock-data'

// set up mock server for testing

const baseUrl = process.env.REACT_DEV_SERVER_URL

export const handlers = [
  rest.get(`${baseUrl}/api/results`, (req: RestRequest, res: ResponseComposition<any>, ctx: RestContext) => {
    return res(ctx.json(mockResults));
  }),
  rest.delete(`${baseUrl}/api/results/:id`, (req: RestRequest<{ id: string }>, res: ResponseComposition<any>, ctx: RestContext) => {
    return res(ctx.status(204));
  }),
]

export const server = setupServer(...handlers)