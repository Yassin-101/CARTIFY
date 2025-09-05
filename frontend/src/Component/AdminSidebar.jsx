import React from 'react'
import { NavLink } from 'react-router-dom'
import {LayoutDashboard} from 'lucide-react'

const AdminSidebar = () => {
  return (
    <div className='w-64 bg-white border-r p-6 flex flex-col'>
      <h2 className='text-2xl font-bold text-red-600 mb-8'>CARTIFY ADMIN</h2>
      <span className=''>
        <ul>
          <NavLink>
          <span className='flex gap-2 text-lg items-center'>
          <LayoutDashboard />
            Dashboard
            </span>
          </NavLink>
        </ul>
      </span>
    </div>
  )
}

export default AdminSidebar
