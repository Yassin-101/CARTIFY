import React from 'react'
import Navbar from '../Component/Navbar'
import Header from '../Component/Header'
import { Outlet, useParams } from 'react-router-dom'

const MainLayout = () => {
    const {category} = useParams()
  return (
    <div>
        
        <Navbar/>
        {/* <Header category={category}/> */}
      <main>
        <Outlet/>
      </main>
    </div>
  )
}

export default MainLayout
