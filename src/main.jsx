import React, { StrictMode } from 'react'
import './index.css'
import App from './App.jsx'
import { ConfigProvider, theme } from 'antd'
import ReactDOM from 'react-dom/client'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider
    theme={{
      algorithm:theme.defaultAlgorithm
    }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
)