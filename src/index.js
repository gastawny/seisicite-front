import { SpeedInsights } from '@vercel/speed-insights/react'

import './styles/index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppRoutes } from './routes'
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRoutes />
      <SpeedInsights />
    </BrowserRouter>
  </React.StrictMode>
)
