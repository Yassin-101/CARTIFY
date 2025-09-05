import React from 'react'
import {LogOut, Menu} from 'lucide-react'
import { Navigate } from 'react-router-dom'

const AdminHero = () => {
 
  return (
    <div className='flex items-center justify-between px-4 py-3 bg-white border-b'>
      <button className='lg:hidden sm:block bg-black text-white flex px-4 py-3 rounded-md'>
       <Menu />
       <span className='sr-only'>Toggle Menu</span>
      </button>
      <div className='flex flex-1 justify-end'>
        <button className='cursor-pointer bg-black text-white rounded-md inline-flex gap-2 px-4 py-3 items-center '> <LogOut /> Logout</button>
      </div>
      
    </div>
  )
}

export default AdminHero
