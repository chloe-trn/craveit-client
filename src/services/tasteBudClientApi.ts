import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' 
import type { RootState } from '../app/redux-store'
import type { User, Quiz, Result } from '../helpers/types'

// Define an API client to communicate with the server
export const tasteBudClientApi = createApi({
  reducerPath: 'tasteBudClientApi', 
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_DEV_SERVER_URL, 
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body: User) => {
        return {
          url: 'api/user/login', // API endpoint for login
          method: 'post', // HTTP method for the request
          body, // body with username and password
        }
      },
    }),
    registerUser: builder.mutation({
      query: (body: User) => {
        return {
          url: 'api/user/register', // API endpoint for registration
          method: 'post', // HTTP method for the request
          body, // body with username, email, and password
        }
      },
    }),
    submitQuiz: builder.mutation({
      query: (body: Quiz) => {
        return {
          url: 'api/quizzes', // API endpoint for quiz submission
          method: 'post', // HTTP method for the request
          body, // body with username and password
        }
      },
    }),
    saveResult: builder.mutation({
      query: (body: Result) => {
        return {
          url: 'api/results', // API endpoint for saving a quiz result
          method: 'post', // HTTP method for the request
          body, // body with username and password
        }
      },
    }),
    getResults: builder.query<Array<Result>, void>({
      query: () => ({
        url: 'api/results', // API endpoint for retrieving results
        method: 'get', // HTTP method for the request
      }),
    }),
    deleteResult: builder.mutation<void, number>({
      query: (id: number) => ({
        url: `api/results/${id}`, // API endpoint for deleting a result
        method: 'delete', // HTTP method for the request
      }),
    }),
  })
})

export const { 
  useLoginUserMutation, 
  useRegisterUserMutation, 
  useSubmitQuizMutation, 
  useSaveResultMutation,
  useGetResultsQuery,
  useDeleteResultMutation
} = tasteBudClientApi
