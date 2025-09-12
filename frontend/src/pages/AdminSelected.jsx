import axios from 'axios'
import React, { useState } from 'react'
import {X,Upload} from "lucide-react"
import upload from '../assets/upload_area.png'

const AdminSelected = () => {
  const [image,setImage] = useState(Array(4).fill(null))
  const [preview,setPreiew] = useState(Array(4).fill(null))
  const [names,setNames] = useState(Array(4).fill(null))
  const [category,setCategory] = useState("women")
  const [loading,setloading] = useState(false)
  const [message,setMessage] = useState({type:"",text:""})

  // handle file selection
  const handleFile = (e,index) =>{
    const file = e.target.files[0]
    if(!file) return

    const newImages = [...image]
    newImages[index] = file
    setImage(newImages)

    const newPreview = [...preview]
    newPreview[index] = URL.createObjectURL(file)
    setPreiew(newPreview)
  }

  // Handle name change
   const handleName = (value, index) => {
    const newNames = [...names]
    newNames[index] = value
    setNames(newNames)
  };

    // Remove file
  const handleRemove = (index) => {
    const newImages = [...image]
    const newPreview = [...preview]
    newImages[index] = null
    newPreview[index] = null
    setImage(newImages)
    setPreiew(newPreview)
  };


  //upload
  const handleUpload = async()=>{
    if(image.some((img)=>img===null)|| names.some((n)=>n.trim()==="")){
      setMessage({type:"error",text:"Please upload all 4 images and name"})
      return
    }
  
  
  const formData = new FormData()
  image.forEach((img)=> formData.append("images",img))
  formData.append("names",JSON.stringify(names))
  formData.append("category",category)

  try {
    setloading(true)
    await axios.post("http://localhost:3100/api/selected-collection/upload",formData,{
    headers:{"Content-Type":"multipart/form-data"}
    })
      setMessage({ type: "success", text: "Uploaded successfully!" })
      setImage(Array(4).fill(null))
      setPreiew(Array(4).fill(null))
      setNames(Array(4).fill(""))
    
  } catch (error) {
     console.error(error);
      setMessage({ type: "error", text: "Upload failed. Try again" });
  }finally{
    setloading(false)
  }
}
  return (
    <div className='bg-gray-50 py-10 px-6'>
      <div className='max-w-6xl '>
                <h1 className="text-2xl font-bold mb-2">Selected Collection Upload</h1>
        <p className="text-gray-600 mb-8">Upload 4 curated images with names for each category</p>

        {/* Message */}
        {message.text && (
          <div
            className={`mb-6 p-3 rounded-md text-sm font-medium ${
              message.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Category selector */}
             <div className="mb-8">
          <label className="block mb-2 font-medium text-gray-700">Select Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-64 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-black focus:outline-none"
          >
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kids</option>
          </select>
        </div>
        {/* Upload section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="relative flex flex-col space-y-3">
              {/* File input */}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFile(e, index)}
                className="hidden"
                id={`file-${index}`}
              />
              <label
                htmlFor={`file-${index}`}
                className="w-full h-40 flex items-center justify-center cursor-pointer  rounded-lg overflow-hidden"
              >
                 {preview[index] ? (
                  <img
                   src={preview[index]}
                  alt={`preview-${index}`}
                   className="w-full h-full object-cover rounded-lg"
                     />
                   ) : (
                  <img src={upload} alt="upload" className="w-40 opacity-60" />
                   )}
              </label>

              {/* Remove button */}
              {preview[index] && (
                <button
                  onClick={() => handleRemove(index)}
                  className="absolute top-2 right-2 bg-black text-white rounded-full p-1 hover:bg-gray-800"
                >
                  <X size={14} />
                </button>
              )}

              {/* Name input */}
              <input
                type="text"
                placeholder="Enter image name"
                value={names[index]}
                onChange={(e) => handleName(e.target.value, index)}
                className="border-b border-gray-300 px-2 py-1 text-sm focus:border-black focus:ring-0 outline-none"
              />
            </div>
          ))}
        </div>

        {/* upload button */}
          <button
          onClick={handleUpload}
          disabled={loading}
          className={` cursor-pointer px-10 py-3 font-semibold text-white rounded-md transition ${
            loading ? "bg-gray-400" : "bg-black hover:bg-gray-900"
          }`}
        >
          {loading ? "Uploading..." : "Upload Collection"}
        </button>

      </div>
      
    </div>
  )
}

export default AdminSelected
