import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { CreditProvider } from './context/CreditContext'
import { ProjectProvider } from './context/ProjectContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CreditProvider>
          <ProjectProvider>
            <App />
          </ProjectProvider>
        </CreditProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)