import axios from 'axios'
import React, { use, useState } from 'react'
import upload from '../assets/upload_area.png'

const AdminHeader = () => {
    const [message,setMessage] = useState({type:"",text:""})
    const [images,setImages] = useState([null,null,null])
    const [loading,setLoading] = useState(false)
    const [preview,setPreview] = useState([null,null,null])
    const [category,setCategory] = useState("women")

    // this will handle file selection
    const handleFile = (e,index)=>{
        const file = e.target.files[0]
        if(!file) return 

        const newImages = [...images]
        newImages[index] = file
        setImages(newImages)

        const newPreview = [...preview]
        newPreview[index] = URL.createObjectURL(file)
        setPreview(newPreview)
    }

    // upload images
    const handleUpload = async()=>{
        if(images.some((img)=> img === null)){
            setMessage({
                type:"error",
                text:"Please upload all 3 images for this category"
            })
            return
        }
        const formData = new FormData()
        images.forEach((img)=>formData.append("images",img))
        formData.append('category',category)
       
    try {
      setLoading(true);
      await axios.post("http://localhost:3100/api/header/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage({ type: "success", text: "Images uploaded successfully!" });
      setImages([null, null, null]);
      setPreview([null, null, null]);
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Upload failed. Please try again." });
    } finally {
      setLoading(false);
    }
    }
  return (
    <div className=' bg-gray-50 py-5 px-6'>
        <div className='max-w-5xl'>
            {/* title */}
            <h1 className='text-2xl font-medium mb-1'>Header image upload</h1>
            <p className='text-gray-500 mb-8'>Upload 3 header images for each category. Images should be high-resolution (recommended 2000x1125)</p>
            {/* feedback */}
            {message.text && (
          <div
            className={`mb-6 p-3 rounded-lg text-sm font-medium ${
              message.type === "success"
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            {message.text}
          </div>
            )}
            {/* category selector */}
            <div className='mb-10'>
                <label className='block mb-2 text-gray-700 font-medium'>Category</label>
                <select value={category} onChange={(e)=>setCategory(e.target.value)}
                 className='w-64 border border-gray-300 rounded-md p-2 text-gray-700 focus:ring-black focus:ring-1 focus:border-black'>
                <option value='women'>Women</option>
                <option value='men'>Men</option>
                <option value='kid'>Kids</option>
                </select>
            </div>
            {/* upload grid */}
            <div className='space-y-8 mb-12'>
                {
                    ["Top Banner","Left Banner","Right Banner"].map((label,index)=>(
                        <div key={index} className='flex items-center space-x-6'>
                            {/* label */}
                            <div className='w-40 text-gray-700 font-medium'>
                                {label}
                            </div>
                            {/* file input */}
                            <div className='flex-1'>
                                <input
                                type='file'
                                accept='image/*'
                                onChange={(e)=>handleFile(e,index)}
                                className='block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-800 hover:file:bg-gray-200 cursor-pointer
                                '
                                />
                            </div>
                            {/* preview */}
                            <div className='w-42 h-30 flex items-center justify-center border border-gray-200 '>
                               {preview[index] ?(
                                <img src={preview[index]} alt="" className='w-full h-full cursor-pointer' />
                               ):(
                             <img src={upload} alt="" />
                               )} 
                            </div>
                        </div>
                    ))
                }
            </div>
            {/* upload button */}
            <button onClick={handleUpload} disabled={loading} 
            className={`w-full sm:w-auto px-8 py-3 font-semibold text-white rounded-md transition 
            ${loading?"bg-gray-400":"bg-black hover:bg-gray-900"}`}>
                {loading?"Uploading...":"Upload Images"}
            </button>
        </div>
      
    </div>
  )
}

export default AdminHeader
