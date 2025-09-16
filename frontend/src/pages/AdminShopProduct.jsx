import axios from 'axios'
import React, { useState } from 'react'
import { X } from "lucide-react";
import upload from "../assets/upload_area.png";

const AdminShopProduct = () => {
  const [image,setImage] = useState(null)
  const [preview,setPreview] = useState(null)
  const [name,setName] = useState("")
  const [price,setPrice] = useState("")
  const [category,setCategory] = useState("women")
  const [subCategory,setSubCategory] = useState("")
  const [loading,setLoading] = useState(false)
  const [message,setMessage] = useState({type:"",text:""})

  // save all the file here
  const handleFile = (e)=>{
    const file = e.target.file[0]
    if(!file) return 
    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  // remove the file
  const removeFile = ()=>{
    setImage(null)
    setPreview(null)
  }

  // upload the file
  const handleUpload = async()=>{
    if(!image || !name || !price || !subCategory){
      setMessage({type:"error",text:"Please provide image, name, price and subCategory"})
      return
    }
    
    const fd = new FormData()
    fd.append("image",image)
    fd.append("name",name)
    fd.append("price",price)
    fd.append("category",category)
    fd.append("subCategory",subCategory)

    try {
      setLoading(true)
      await axios.post("http://localhost:3100/api/shop-product/upload",fd,{
        headers:{"Content-Type":"multipart/form-data"}
      })
      setMessage({type:"success",text:"Product Uploaded Successfully"})
      setImage(null)
      setPreview(null)
      setName("")
      setPrice("")
      setSubCategory("")
    } catch (error) {
        console.error(error);
      setMessage({ type: "error", text: "Upload failed. Try again." });
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className='bg-gray-50 py-10 px-6'>
      <div className='max-w-3xl'>
        <h1 className='text-2xl font-bold mb-2'>Selected Collection Products Upload</h1>
        <p className='text-gray-600 mb-8'>Add new products details with image, category, pricing</p>

        {message.text &&(
          <div className={`mb-6 p-3 rounded-md text-sm font-medium ${
              message.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"}`}>
            {message.text}
          </div>
        )}

        {/* upload image */}
        <div className='mb-8'>
          <label className='block mb-2 font-medium text-gray-700'>Upload Selected Product Image</label>
          {/* preview */}
          <div className='relative w-48 h-48 border border-gray-300 rounded-lg flex items-center justify-center overflow-hidden bg-white'>
            {preview ?(
              <>
              <img src={preview} alt="" className='w-full h-full object-cover'/>
              <button onClick={removeFile} className='absolute top-2 right-2 bg-black text-white rounded-full p-1 hover:bg-gray-800'> < X size={14}/> </button>
              </>
            ): (
              <label htmlFor='file-upload' className='cursor-pointer flex flex-col items-center text-gray-500'>
                <img src={upload} alt="" className='w-47 opacity-60 ' />
              

              </label>
            )}
            <input type='file' accept='image/*' onChange={handleFile} id='file-upload' className='hidden'/>
          </div>
        </div>

        {/* form input */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10'>
          {/* name */}
          <div>
            <label className='block mb-2 font-medium text-gray-700'>Product Name</label>
            <input 
            value={name}
            onChange={(e)=>setName(e.target.value)}
            placeholder='Enter Product Name'
            className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black'
            />
          </div>
            {/* price */}
            <div>
              <label className='block mb-2 font-medium text-gray-700'>Price (AED)</label>
               <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              type="number"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            />
            </div>
            {/* category */}
            <div>
              <label className='block mb-2 font-medium text-gray-700'>Category</label>
               <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            >
              <option value="women">Women</option>
              <option value="men">Men</option>
              <option value="kid">Kids</option>
            </select>
            </div>
            {/* subCategory */}
            <div>
                  <label className="block mb-2 font-medium text-gray-700">Subcategory</label>
            <input
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              placeholder="e.g. dress, top"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            />
            </div>

            {/* upload button */}
            <button
            onClick={handleUpload}
            disabled={loading}
             className={`px-10 py-3 font-semibold cursor-pointer text-white rounded-md transition ${
            loading ? "bg-gray-400" : "bg-black hover:bg-gray-900"
          }`}
            >{loading?"Uploading...":"Upload Product"}</button>

        </div>

      </div>
      
    </div>
  )
}

export default AdminShopProduct
