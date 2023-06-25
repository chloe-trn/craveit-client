import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' 
import type { RootState } from '../app/redux-store'
import type { Result } from '../helpers/types'

// Define an API client to communicate with the server
export const tasteBudClientApi = createApi({
  reducerPath: 'tasteBudClientApi', 
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:7175', // Dev base URL for API requests, change in production
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
      query: (body: { 
        username: string; 
        password: string;
      }) => {
        return {
          url: 'api/user/login', // API endpoint for login
          method: 'post', // HTTP method for the request
          body, // body with username and password
        }
      },
    }),
    registerUser: builder.mutation({
      query: (body: { 
        username: string; 
        email: string; 
        password: string;
      }) => {
        return {
          url: 'api/user/register', // API endpoint for registration
          method: 'post', // HTTP method for the request
          body, // body with username, email, and password
        }
      },
    }),
    submitQuiz: builder.mutation({
      query: (body: { 
        userId: string;
        date: string;
        location: string;
        distance: string;
        cuisine: string;
        priceRange: string;
      }) => {
        return {
          url: 'api/quizzes', // API endpoint for quiz submission
          method: 'post', // HTTP method for the request
          body, // body with username and password
        }
      },
    }),
    saveResult: builder.mutation({
      query: (body: { 
        userId: string;
        quizId: string;
        date: string;
        restaurantName: string;
        location: string;
        priceRange: string;
      }) => {
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
    })
  })
})

export const { 
  useLoginUserMutation, 
  useRegisterUserMutation, 
  useSubmitQuizMutation, 
  useSaveResultMutation,
  useGetResultsQuery
} = tasteBudClientApi
