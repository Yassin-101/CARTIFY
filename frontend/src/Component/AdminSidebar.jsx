import React from 'react'
import { NavLink } from 'react-router-dom'
import {Bell, Cog, LayoutDashboard, Library, LogOut, PackagePlus, PanelTop, ShoppingBasket, UsersRound} from 'lucide-react'

const AdminSidebar = () => {
  return (
    <div className='w-64 bg-white border-r p-6 flex flex-col'>
      <h2 className='text-2xl font-bold text-red-600 mb-8'>CARTIFY ADMIN</h2>
      <span className='flex-1'>
        <ul>
        {/* Dashboard */}
          <NavLink to={'/admin'} className={({isActive})=>`block px-2 py-3 rounded hover:text-red-600 ${isActive?"font-medium text-gray-700":"text-red-600"}`}>
          <span className='flex gap-2 text-lg items-center'>
          <LayoutDashboard />
            Dashboard
            </span>
          </NavLink>
          {/* Hero Section */}
          <NavLink className={({isActive})=>`block px-2 py-3 rounded hover:text-red-600 ${isActive?"font-medium text-gray-700":"text-red-600"}`}>
            <span className='flex gap-2 text-lg items-center'>
              <PanelTop />
                  Hero Section
            </span>
            </NavLink>
            {/* New Collection */}
            <NavLink className={({isActive})=>`block px-2 py-3 rounded hover:text-red-600 ${isActive?"font-medium text-gray-700":"text-red-600"}`}>
              <span className='flex gap-2 text-lg items-center'>
                <PackagePlus />
                New Collection
              </span>
            </NavLink>
            {/* Selected collection */}
            <NavLink className={({isActive})=>`block px-2 py-3 rounded hover:text-red-600 ${isActive?"font-medium text-gray-700":"text-red-600"}`}>
              <span className='flex gap-2 text-lg items-center'>
                <Library />
                Selected Collection
              </span>
            </NavLink>
            {/* products */}
            <NavLink className={({isActive})=>`block px-2 py-3 rounded hover:text-red-600 ${isActive?"font-medium text-gray-700":"text-red-600"}`}>
              <span className="flex gap-2 text-lg items-center">
                <ShoppingBasket />
                Products
              </span>
            </NavLink>
            {/* Customers */}
            <NavLink className={({isActive})=>`block px-2 py-3 rounded hover:text-red-600 ${isActive?"font-medium text-gray-700":"text-red-600"}`}>
              <span className='flex gap-2 text-lg items-center'>
                <UsersRound />
                Customers
              </span>
            </NavLink>
            {/* Notification */}
            <NavLink className={({isActive})=>`block px-2 py-3 rounded hover:text-red-600 ${isActive?"font-medium text-gray-700":"text-red-600"}`} >
              <span className='flex gap-2 text-lg items-center'>
                <Bell />
                Notifications
              </span>
            </NavLink>
            {/* Setting */}
            <NavLink className={({isActive})=>`block px-2 py-3 rounded hover:text-red-600 ${isActive?"font-medium text-gray-700":"text-red-600"}`}>
            <span className='flex gap-2 text-lg items-center'>
              <Cog />
              Settings
            </span>
            </NavLink>
        </ul>
      </span>
      <div className='mt-auto pt-6'>
         <div className='flex flex-1 '>
                <button className='cursor-pointer bg-white text-black rounded-md inline-flex gap-2 px-4 py-3 items-center '> <LogOut /> Logout</button>
              </div>
      </div>
    </div>
  )
}

export default AdminSidebar
