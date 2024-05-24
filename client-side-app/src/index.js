import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/@fortawesome/fontawesome-free/css/all.css'
// import Navbar from './components/NavBar/NavBar'
import './index.css'


ReactDOM.createRoot(document.getElementById("root")).render(
  
    <BrowserRouter>
    
        <App/>
    </BrowserRouter>
    
)