import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './input.css'
// import {Router} from "react-router";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      {/*<Router  >*/}
          <App />
      {/*</Router>*/}
  </React.StrictMode>,
)
