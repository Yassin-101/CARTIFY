import React from 'react'
import Header from '../Component/Header'
import { useParams } from 'react-router-dom'
import Navbar from '../Component/Navbar'
import New from '../Component/New'
import SelectedCollection from '../Component/SelectedCollection'

const ShopCategory = () => {
  const {category} = useParams()
  return (
    <div>
      
      <Header category={category}/>
      <New category={category}/>
      <SelectedCollection category={category}/>
    </div>
  )
}

export default ShopCategory
