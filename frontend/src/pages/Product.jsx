import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'

const Product = () => {

  const {id} = useParams()
  const {currency} = useContext(ShopContext)

  const [products,setProducts] = useState(null)
  const [selectedSize,setSelectedSize] = useState(null)
  const [expandDetails,setExpandDetails] = useState(null)
  const [expandDelivery,setExpandDelivery] = useState(null)

  useEffect(()=>{
    const fetchProduct = async()=>{
      try {
        const res = await axios.get(`http://localhost:3100/api/products/${id}`)
        setProducts(res.data.products)
      } catch (error) {
        console.error("Error fetching products:",error)
      }
    }
    fetchProduct()
  },[id])

  if(!products){
    return<p className='text-center text-xl mt-20'>Loading product...</p>
  }
  return (
    <div className=''>
      <div className='flex flex-col lg:flex-row gap-10'>
 {/* images */}
 <div className='w-full lg:w-[47%]'>
 {/* image 1 */}
 {products.images?.[0] && (
  <img src={`http://localhost:3100${products.images[0]}`} alt="" className='w-full object-cover'/>
 )}
 {/* image 2 and 3 will be merged */}
 {(products.images?.[1] || products.images?.[2]) && (
    <div className="grid grid-cols-2">
      {products.images[1] && (
        <img
          src={`http://localhost:3100${products.images[1]}`}
          className="w-full object-cover"
        />
      )}
      {products.images[2] && (
        <img
          src={`http://localhost:3100${products.images[2]}`}
          className="w-full object-cover"
        />
      )}
    </div>
  )}

   {products.images?.[3] && (
    <img
      src={`http://localhost:3100${products.images[3]}`}
      className="w-full object-cover"
    />
  )}
 </div>
        
      </div>
      
    </div>
  )
}

export default Product
