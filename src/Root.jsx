import { AppProvider } from './context/AppContext'
import App from './App'

export default function Root() {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  )
}
