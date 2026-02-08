import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { reportWebVitals, observePerformance } from './utils/reportWebVitals'

// React 앱 렌더링
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Web Vitals 측정 시작
reportWebVitals()
observePerformance()
