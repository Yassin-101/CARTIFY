import React from 'react'
import { Routes, Route } from 'react-router-dom'

import MainLayout from './pages/MainLayout'
import AdminLayout from './pages/AdminLayout'
import ShopCategory from './pages/ShopCategory'
import Login from './pages/Login'
import Cart from './pages/Cart'
import AdminView from './pages/AdminView'
import AdminProduct from './pages/AdminProduct'

const App = () => {
  return (
    <Routes>
      {/* MainLayout wraps all user pages */}
      <Route path="/" element={<MainLayout />}>
        {/* dynamic category route */}
        <Route path=":category" element={<ShopCategory />} />
        {/* static pages */}
        <Route path="/Login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
      </Route>

      {/* Admin pages */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminView />} />
           <Route path="products" element={<AdminProduct />} /> {/* Product Management */}
      </Route>
    </Routes>
  )
}

export default App
