import 'normalize.css'
import './assets/css/index.css'
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/redux-store'
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