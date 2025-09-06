import React from 'react'
import { Routes, Route } from 'react-router-dom'

import MainLayout from './pages/MainLayout'
import AdminLayout from './pages/AdminLayout'
import ShopCategory from './pages/ShopCategory'
import Login from './pages/Login'
import Cart from './pages/Cart'
import AdminView from './pages/AdminView'
import AdminProduct from './pages/AdminProduct'
import Dashboard from './pages/Dashboard'
import AdminHeader from './pages/AdminHeader'
import AdminNew from './pages/AdminNew'
import AdminSelected from './pages/AdminSelected'
import AdminNotifications from './pages/AdminNotifications'
import AdminSetting from './pages/AdminSetting'
import AdminCustomer from './pages/AdminCustomer'

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
           <Route path='dashboard' element={<Dashboard/>}/>
           <Route path='header' element={<AdminHeader/>}/>
           <Route path='new' element={<AdminNew/>}/>
           <Route path='selected' element={<AdminSelected/>}/>
           <Route path="products" element={<AdminProduct />} /> 
           <Route path='customer' element={<AdminCustomer/>}/>
           <Route path='notification' element={<AdminNotifications/>}/>
           <Route path='setting' element={<AdminSetting/>}/>
      </Route>
    </Routes>
  )
}

export default App
