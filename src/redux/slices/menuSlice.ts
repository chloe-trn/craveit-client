import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface MenuState {
  menuOpen: boolean
}

const initialState: MenuState = {
  menuOpen: false,
}

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    openMenu: (state) => {
      state.menuOpen = true
    },
    closeMenu: (state) => {
      state.menuOpen = false
    },
    toggleMenu: (state) => {
      state.menuOpen = !state.menuOpen
    },
  },
})

export const selectMenu = (state: RootState) => state.menu

export const { openMenu, closeMenu, toggleMenu } = menuSlice.actions

export default menuSlice.reducer