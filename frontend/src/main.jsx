import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ShopContextProvider from './context/ShopContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Authprovider } from './context/Auth.jsx'

createRoot(document.getElementById('root')).render(

   <BrowserRouter>
   <Authprovider>
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
    </Authprovider>
   </BrowserRouter>

)
