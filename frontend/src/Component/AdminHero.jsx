import React, { useState } from 'react'
import {BellDot, LogOut, Menu, Search} from 'lucide-react'
import { Navigate } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import { useAdmin } from '../context/AdminContext'

const AdminHero = () => {
const {pageTitle} = useAdmin()
  
 
  return (
    <div className='flex items-center justify-between px-4 py-3 bg-white border-b'>
      <button className='lg:hidden sm:block bg-black text-white flex px-4 py-3 rounded-md'>
       <Menu />
       <span className='sr-only'>Toggle Menu</span>
      </button>
    
        {/* left top bar */}
     <div className='py-3 flex items-center justify-between'>

      <span className='text-2xl font-medium'>{pageTitle}</span>
     </div>

        {/* right top bar */}
     <div>
    <ul className='flex items-center gap-5'>
      <span className='cursor-pointer'><Search /></span>
      <span className='cursor-pointer'><BellDot /></span>

 <div>
       <span> <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" // temporary avatar API
          alt="Admin Profile"
          className="w-9 h-9 rounded-full border-2 border-gray-200 object-cover cursor-pointer"
        /></span>
 </div>

    </ul>
     </div>
    </div>
    
  )
}

export default AdminHero
