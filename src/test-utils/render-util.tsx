import { ReactNode } from 'react'
import { render as customRender, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '../app/redux-store'

// provides a custom render function when a mock store and router are needed to test an inner component
const render = (node: ReactNode) => {
  return customRender(
    <Provider store={store}>
      <MemoryRouter>{node}</MemoryRouter>
    </Provider>
  )
}

export { render, screen }
