import axios from 'axios'
import { ListFilter, Plus } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import {useParams} from "react-router-dom"
import { ShopContext } from '../context/ShopContext'

const ShopProduct = () => {
  const {category,subCategory} = useParams()
  const [shopProduct,setProducts] = useState([])
  const {currency} = useContext(ShopContext)

  useEffect(()=>{
    const fetchProduct = async()=>{
      try {
        const res = await axios.get(`http://localhost:3100/api/shop-product/${category}/${subCategory}`)
        setProducts(res.data.products || [])
      } catch (error) {
        console.error(error)
      }
    }
    fetchProduct()
  },[category,subCategory])
  return (
    <div className=''>
      {/* subCategory */}
      <h1 className='text-4xl font-semibold uppercase p-8'>{subCategory}</h1>
      {/* sort & filtering */}
      <div className='uppercase text-xl underline flex flex-row justify-between items-center left-3 right-3'>
        <p className='flex pl-8 mt-2 cursor-pointer'>sort by <Plus /></p>
        <p className='flex pr-8 cursor-pointer'>filter <ListFilter /></p>
      </div>

         {/* images */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {shopProduct.map((p,index)=>(
          <div key={index} >
            <img src={`http://localhost:3100${p.image}`} alt="" className='w-full h-auto object-cover'/>
            <div className='pt-1'>
              <h3 className='text-lg'>{p.name}</h3>
              <p className='pt-1 font-bold'>{currency}{p.price}</p>
            </div>
          </div>
        ))}

      </div>
      {/* if there is no product */}
      {shopProduct.length === 0 && <p className='mt-6 text-gray-500 text-center text-2xl'>No items is found for this {category} in {subCategory}.</p>}
      
    </div>
  )
}

export default ShopProduct
