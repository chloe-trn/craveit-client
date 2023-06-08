import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/redux-store'

export interface AuthState {
    username: string | null,
    token: string | null
}
 
const initialState: AuthState = {
    username: null,
    token: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // setUser reducer: Updates state with the provided username and username
        setUser: (state, action: PayloadAction<{ username: string | null, token: string | null, }>) => {
            localStorage.setItem('tastebud_user', JSON.stringify({
                username: action.payload.username,
                token: action.payload.token
            }))

            state.username = action.payload.username
            state.token = action.payload.token
        },
        // logOut reducer: Clears local storage and resets state
        logOut: (state) => {
            localStorage.clear()
            state.username = null
            state.token = null
        }
    }
})

export const selectAuth = (state: RootState) => state.auth

export const { setUser, logOut } = authSlice.actions

export default authSlice.reducer