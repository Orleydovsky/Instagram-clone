import ReactDOM from 'react-dom/client'
import App from './app'
import 'normalize.css'
import '../index.css'
import { AppProviders } from './components/app-providers'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AppProviders>
      <App />
  </AppProviders>
)
