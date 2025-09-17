import axios from 'axios'
import { ListFilter, Plus } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import {useParams} from "react-router-dom"
import { ShopContext } from '../context/ShopContext'

const ShopProduct = () => {
  const {category,subCategory} = useParams()
  const [shopProduct,setProduct] = useState([])
  const {currency} = useContext(ShopContext)

  useEffect(()=>{
    const fetchProduct = async()=>{
      try {
        const res = await axios.get(`http://localhost:3100/api/shop-product/${category}/${subCategory}`)
        setProduct(res.data.product || [])
      } catch (error) {
        console.error(error)
      }
    }
    fetchProduct()
  },[category,subCategory])
  return (
    <div className=''>
      {/* subCategory */}
      <h1 className='text-5xl font-semibold uppercase p-8'>{subCategory}</h1>
      {/* sort & filtering */}
      <div className='uppercase text-2xl underline flex flex-row justify-between items-center '>
        <p className='flex pl-8 items-center  mt-2 cursor-pointer'>sort by<span className='pl-1 mt-1'> <Plus size={30} /></span> </p>
        <p className='flex pr-8 items-center cursor-pointer'>filter <span className='pl-3'><ListFilter size={19} /></span></p>
      </div>

         {/* images */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 cursor-pointer py-6'>
        {shopProduct.map((p,index)=>(
          <div key={index} >
            <img src={`http://localhost:3100${p.image}`} alt="" className='w-full h-auto object-cover'/>
            <div className=' pl-6 py-5 max-w-[470px]'>
              <h3 className='text-[23px] uppercase'>{p.name}</h3>
              <p className='pt-1 font-bold text-[21px] pb-3'>{currency}   {p.price}.00</p>  
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
