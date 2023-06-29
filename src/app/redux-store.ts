import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { clientApi } from '../services/clientApi'
import authReducer from '../services/auth/authSlice'
import menuReducer from '../services/menu/menuSlice'
import quizReducer from '../services/quiz/quizSlice'

// Configure Redux store
export const store = configureStore({
  reducer: {
    [clientApi.reducerPath]: clientApi.reducer,
    auth: authReducer,
    menu: menuReducer,
    quiz: quizReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(clientApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)
