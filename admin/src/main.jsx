import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import './index.css'
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
    <Provider store={store}>
<<<<<<< HEAD:admin/src/main.jsx
      <App/>
      {/* <AppRouter /> */}
=======
      <AppRouter />
>>>>>>> neeteshN1:frontend/src/main.jsx
    </Provider>
  </StrictMode>,
)
