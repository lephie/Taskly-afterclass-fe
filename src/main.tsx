import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import './index.css'
import Route from './Route.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Route />
  </BrowserRouter>,
)
