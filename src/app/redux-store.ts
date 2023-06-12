import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { tasteBudClientApi } from '../services/tasteBudClientApi'
import authReducer from '../services/auth/authSlice'
import menuReducer from '../services/menu/menuSlice'

// Configure Redux store
export const store = configureStore({
  reducer: {
    [tasteBudClientApi.reducerPath]: tasteBudClientApi.reducer,
    auth: authReducer,
    menu: menuReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasteBudClientApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)
