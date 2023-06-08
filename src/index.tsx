import ReactDOM from 'react-dom/client'
import { store } from './app/redux-store'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import './assets/css/index.css'
import App from './App'

// Create a root element to render the app inside of
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
)