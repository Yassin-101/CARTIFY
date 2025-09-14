import React from 'react'
import Navbar from '../Component/Navbar'
import Header from '../Component/Header'
import { Outlet, useParams } from 'react-router-dom'
import Footer from '../Component/Footer'
import ScrolToTop from '../Component/ScrolToTop'

const MainLayout = () => {
    const {category} = useParams()
  return (
    <div>
        <ScrolToTop/>
        <Navbar/>
        {/* <Header category={category}/> */}
      <main>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}

export default MainLayout
