import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // Thêm dòng này
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Thêm basename để khớp với cấu hình server /tech-sale/ */}
    <BrowserRouter basename="/tech-sale/">
      <App />
    </BrowserRouter>
  </StrictMode>,
)