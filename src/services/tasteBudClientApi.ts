import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define an API client to communicate with the server
export const tasteBudClientApi = createApi({
  reducerPath: 'tasteBudClientApi', 
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:7175', // Dev base URL for API requests, change in production
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
  }),
})

export const { useLoginUserMutation, useRegisterUserMutation } = tasteBudClientApi
