import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

//NOTE //* Draggables...


import { AppStateProvider } from './providers/AppStateProvider'


ReactDOM.render(
  <React.StrictMode>
      <AppStateProvider>
        <App />
      </AppStateProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
