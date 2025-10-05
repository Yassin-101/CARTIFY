import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { Minus, Plus } from 'lucide-react'

const Product = () => {
  const {id} = useParams()

  const [product,setProduct] = useState(null)
  const [allProducts,setAllProducts] = useState([])
  const [selectedSize,setSelectedSize] = useState(null)
  const [expand1,setExpand1] = useState(false)
  const [expand2,setExpand2] = useState(false)
  const {currency} = useContext(ShopContext)

  const addToCart = (id,size)=>{
    console.log(`Added ${id} (${size}) to cart`)
  }

  // Fetch the main product from backend
  useEffect(()=>{
    const fetchProduct = async()=>{
      try {
        const res = await axios.get(`http://localhost:3100/api/products/${id}`)
        setProduct(res.data.products)
      } catch (error) {
          console.error("Error fetching product:", error);
      }
    }
    fetchProduct()
  },[id])

  // fetch all the products from the backend for the different color
  useEffect(()=>{
    const fetchAllProducts = async()=>{
      try {
        const res = await axios.get(`http://localhost:3100/api/products`)
        setAllProducts(res.data.products)
      } catch (error) {
          console.error("Error all fetching product:", error);
      }
    }
    fetchAllProducts()
  },[])

   if (!product) {
    return <p className="text-center text-xl mt-20">Loading product...</p>;
  }

  // different color but same item article number
   const alternateColors = allProducts.filter(
    (item) =>
      item.articleNumber?.slice(0, -1) === product.articleNumber?.slice(0, -1) &&
      item._id !== product._id
  );
    console.log("Filtered alternate colors:", alternateColors);
  return (
    <div className='transition-opacity ease-in-out duration-300 opacity-300'>
      <div className='flex flex-col lg:flex-row'>
        {/* left product image */}
        <div className='w-full lg:w-[47%] pr-12'>
          {product.images?.[0] && (
            <img src={`http://localhost:3100${product.images[0]}`} alt="" className='w-full object-cover' />
          )}
          {/* product 2 and 3 will be merged */}
          {(product.images?.[1] || product.images?.[2]) && (
            <div className='grid grid-cols-2'>
              {product.images[1] && (
                <img src={`http://localhost:3100${product.images[1]}`} alt="" className='w-full object-cover'/>
              )}

              {product.images[2] && (
                <img src={`http://localhost:3100${product.images[2]}`} alt="" className='w-full object-cover'/>
              )}
            </div>
          )}

          {product.images?.[3] && (
            <img src={`http://localhost:3100${product.images[3]}`} alt="" className='w-full object-cover' />
          )}

        </div>

        {/* right product details */}
        <div className='w-full lg:w-[50%] lg:sticky lg:top-0 h-fit self-start pl-70'>
          {/* product name and favourates */}
          <div className='flex items-center justify-between'>
            <h1 className='uppercase text-2xl mt-1'>{product.name}</h1>
              <span className="mr-35 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                className="w-6 h-6 stroke-black hover:fill-red-500 hover:stroke-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 
                     0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 
                     3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </span>
          </div>
          {/* price */}
          <div className='flex justify-between items-center mt-2'>
            <p className='font-medium text-2xl'> <span className='mr-1'>{currency}</span>{product.price}.00</p>
          </div>

          {/* color + image */}
          <div className='mt-10 text-xl'>
            <p>COLOR: <span className='capitalize'>{product.colors}</span></p>
          </div>

          <div className='flex gap-3 py-2'>
            {/* current color image */}
            {product.images?.[3] &&(
              <img src={`http://localhost:3100${product.images[3]}`} alt="" className='w-[15%] h-auto cursor-pointer border border-black' />
            )}

            {/* alternate color */}
            {alternateColors.map((alt)=>(
              <img src={`http://localhost:3100${alt.images?.[3] || alt.images?.[0]}`} alt=""
              key={alt._id}
              onClick={()=>(window.location.href = `/product/${alt._id}`)}
              className='w-[15%] h-auto cursor-pointer'
              />
            ))}
          </div>

          {/* sizes */}
          <div className='mt-10'>
            <p className='text-xl uppercase'>SELECT SIZE:</p>
            <div className='grid grid-cols-4 mt-4 w-[29rem] max-w-full'>
              {Array.isArray(product.sizes) &&(
                product.sizes.map((item,index)=>(
                  <button
                  onClick={()=>setSelectedSize}
                   className={`uppercase border sm:py-4 w-full h-[4rem] text-lg font-[500] cursor-pointer ${
                      item === selectedSize
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                    key={index}
                  >
                    {item}
                  </button>
                ))
              )}
            </div>
            <div className='mt-5'>
              <span className='text-[1.2rem] underline cursor-pointer uppercase'>
                size guide
              </span>
            </div>
          </div>

            {/* add to cart button */}
            <div className='mt-10'>
              <button
              onClick={()=> addToCart(product._id,selectedSize)}
              className="bg-black text-white text-[1.2rem] px-40 py-3 cursor-pointer uppercase"
              >
                add to basket
              </button>
            </div>

            {/* product details toggle */}
          
              <div onClick={()=>setExpand1(!expand1)} className="flex items-center justify-between cursor-pointer mt-10 mr-30">
                <p className={`text-xl uppercase ${expand1 ? "font-bold": ""}`}>
                  product details
                </p>
                  {expand1 ?(
              <Minus size={30} />
            ):(
              <Plus size={30} />
            )}
              </div>
               {expand1 && (
            <div className="mt-5 text-lg">
              <p>{product.description}</p>
              <p className="mt-3 capitalize">Article Number: {product.articleNumber}</p>
              <p className="mt-3 capitalize">Garment Length: {product.garmentLength}</p>
              <p className="mt-3 capitalize">Product Type: {product.productType}</p>
              <p className="mt-3 mb-7 capitalize">Sleeve Length: {product.sleeveLength}</p>
            </div>
          )}

          {/* delivery option toggle */}
          <div
          onClick={()=>setExpand2(!expand2)}
          className="flex items-center justify-between mt-10 cursor-pointer mr-30"
          >
              <p className={`text-xl ${expand2 ? "font-bold" : ""}`}>
              DELIVERY OPTIONS
            </p>
              {expand2 ?(
              <Minus size={30} />
            ):(
              <Plus size={30} />
            )}

          </div>
             {expand2 && (
            <div className="mt-5 text-lg">
              <p className="py-2">
                Explore the delivery options available in your area
              </p>
              <p className="font-medium">Standard Delivery</p>
              <p>Your order will be delivered within 1-2 days.</p>
            </div>
          )}

        </div>

      </div>
      
    </div>
  )
}

export default Product
