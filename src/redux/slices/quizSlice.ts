import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export type Location = {
  street: string
  streetContinued: string
  city: string
  state: string
  zipCode: string
}
  
type QuizState = {
  location: Location
  distance: string
  cuisine: string[]
  priceRange: string[]
}
 
const initialState: QuizState = {
  location: {
    street: '',
    streetContinued: '',
    city: '',
    state: '',
    zipCode: '',
  },
  distance: '',
  cuisine: [],
  priceRange: [],
}

export const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        // setQuiz reducer: Updates state with the provided answers to a quiz
        setQuiz: (state, action: PayloadAction<QuizState>) => {
            state.location = action.payload.location
            state.distance = action.payload.distance
            state.cuisine = action.payload.cuisine
            state.priceRange = action.payload.priceRange
        },
        // clearQuiz reducer: Resets state
        clearQuiz: (state) => {
            state.location = {
              street: '',
              streetContinued: '',
              city: '',
              state: '',
              zipCode: '',
            }
            state.distance = ''
            state.cuisine = []
            state.priceRange = []
        }
    }
})

export const selectAuth = (state: RootState) => state.quiz

export const { setQuiz, clearQuiz } = quizSlice.actions

export default quizSlice.reducer