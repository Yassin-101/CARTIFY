import React from 'react'
import Header from '../Component/Header'
import { useParams } from 'react-router-dom'
import Navbar from '../Component/Navbar'

const ShopCategory = () => {
  const {category} = useParams()
  return (
    <div>
      
      <Header category={category}/>
    </div>
  )
}

export default ShopCategory
