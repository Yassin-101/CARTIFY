import axios from 'axios'
import React, { useState } from 'react'
import { X } from "lucide-react";
import uploadImg from "../assets/upload_area.png";

const AdminProduct = () => {
  const [image,setImage] = useState([])
  const [preview,setPreview] = useState([])

  const [name,setName] = useState("")
  const [price,setPrice] = useState("")
  const [category,setCategory] = useState("women")
  const [subCategory,setSubCategory] = useState("")
  const [productType,setProductType] = useState("")
  const [color,setColor] = useState("")
  const [size,setSize] = useState("")
  const [articleNumber,setArticleNumber] = useState("")
  const [ageGroup,setAgeGroup] = useState("")
  const [garmentLength,setGarmentLength] = useState("")
  const [newCollection,setNewCollection] = useState(false)
  const [selectedCollection,setSelectedCollection] = useState(false)

  const [message,setMessage] = useState({type:"",text:""})
  const [loading,setLoading] = useState(false)

  const handleImage = (e)=>{
    const files = Array.from(e.target.files)
    const newFiles = [...image,...files].slice(0,4)
    setImage(newFiles)
    setPreview(newFiles.map((f)=>URL.createObjectURL(f)))
  }

  const removeImage = (index)=>{
    const newImages = [...image]
    const newPreview = [...preview]
    newImages.splice(index,1)
    newPreview.splice(index,1)
    setImage(newImages)
    setPreview(newPreview)
  }

  const handleSubmit = async(e)=>{
        e.preventDefault()

        if(!name || !price || !subCategory || image.length === 0){
          setMessage({type:"error",text:"Please fill required fields and upload images."})
        }
        const formData = new FormData()
        Image.forEach((img)=>formData.append("images",img))

        formData.append("name",name)
        formData.append("price",price)
        formData.append("category", category);
        formData.append("category", category);
        formData.append("subCategory", subCategory);
        formData.append("productType", productType);
        formData.append("colors", JSON.stringify(colors.split(",")));
        formData.append("sizes", JSON.stringify(sizes.split(",")));
        formData.append("articleNumber", articleNumber);
        formData.append("ageGroup", ageGroup);
        formData.append("garmentLength", garmentLength);
        formData.append("newCollection", newCollection);
        formData.append("selectedCollection", selectedCollection);

       try {
        setLoading(true)

         if(newCollection){
          await axios.post("http://localhost:3100/api/products/upload",formData,{
            headers:{"Content-Type":"multipart/form-data"}
          })
        }

        if(selectedCollection){
          await axios.post("http://localhost:3100/api/products/selected-collection",formData,{
                headers:{"Content-Type":"multipart/form-data"}
          })
        }
        setMessage({type:"success",type:"Product uploaded successfully"})
        // this will reset the data/form

        setImage([])
        setPreview([])
        setName("")
        setPrice("")
        setSubCategory("")
        setCategory("")
        setAgeGroup("")
        setArticleNumber("")
        setColor("")
        setGarmentLength("")
        setSize("")
        setNewCollection(false)
        setSelectedCollection(false)

       } catch (error) {
        console.error(err);
      setMessage({ type: "error", text: "Upload failed. Check console." });
       }finally{
        setLoading(false)
       }

          }
  return (
    <div className='bg-gray-50 py-10 px-6'>
      <div className='max-w-5xl'>
        <h1 className='text-2xl font-bold mb-2'>Product Upload</h1>
        <p className=''>Upload up to 4 images and fill in product details </p>

        {message.text && (
          <div       className={`mb-6 p-3 rounded-md text-sm font-medium ${
              message.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}>
              {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-8'>
          {/* collection type */}
          <div className='flex gap-6'>
              <label className='flex items-center gap-2'>
                  <input type='checkbox' checked={newCollection} onChange={()=>setNewCollection(!newCollection)}/>
                  New Collection
              </label>
              <label className='flex items-center gap-2'>
                <input type='checkbox' checked={selectedCollection} onChange={()=>setSelectedCollection(!selectedCollection)}/>
                Selected Collection
              </label>
          </div>

          {/* image upload */}

          {(newCollection || selectedCollection) && (
            <div>
              <label className='block mb-2 font-medium '>
                Upload Images (MAX 4)
              </label>
              <div className='grid grid-cols-2 sm:grid-cols-4 gap-6'>
                {Array.from({length:4}).map((_,i)=>(
                  <div key={i} className='relative flex flex-col items-center'>
                    <input type='file' accept='image/*' className='hidden' id={`upload-${i}`} onChange={handleImage} multiple/>
                    <label
                      htmlFor={`upload-${i}`}
                      className="w-full h-42 flex items-center justify-center cursor-pointer border border-gray-300 rounded-lg overflow-hidden bg-white object-cover"
                    >
                        {preview[i] ? (
                        <img src={preview[i]}  className="w-full h-auto object-cover" />
                      ) : (
                        <img src={uploadImg} className="w-10 opacity-50" />
                      )}
                    </label>
                        {preview[i] && (
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute top-2 right-2 bg-black text-white rounded-full p-1 hover:bg-gray-800"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ))}

            

              </div>
            </div>
          )}
              {/* product details */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 '>
                    <input type='text' placeholder='Product Name' value={name} onChange={(e)=>e.target.value} className="w-full p-2 border-b focus:border-black" />
                    <input type='number' placeholder='Price' value={price} onChange={(e)=>e.target.value} className="w-full p-2 border-b focus:border-black"/>
                        <input type="text" placeholder="Subcategory *" value={subCategory} onChange={(e) => setSubCategory(e.target.value)} className="w-full p-2 border-b focus:border-black" />
                      <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border-b focus:border-black">
                        <option value="women">Women</option>
                        <option value="men">Men</option>
                        <option value="kid">Kids</option>
                      </select>
                         <input type="text" placeholder="Product Type" value={productType} onChange={(e) => setProductType(e.target.value)} className="w-full p-2 border-b focus:border-black" />
            <input type="text" placeholder="Colors (comma separated)" value={color} onChange={(e) => setColor(e.target.value)} className="w-full p-2 border-b focus:border-black" />
            <input type="text" placeholder="Sizes (comma separated)" value={size} onChange={(e) => setSize(e.target.value)} className="w-full p-2 border-b focus:border-black" />
            <input type="text" placeholder="Article Number" value={articleNumber} onChange={(e) => setArticleNumber(e.target.value)} className="w-full p-2 border-b focus:border-black" />
            <input type="text" placeholder="Age Group" value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)} className="w-full p-2 border-b focus:border-black" />
            <input type="text" placeholder="Garment Length" value={garmentLength} onChange={(e) => setGarmentLength(e.target.value)} className="w-full p-2 border-b focus:border-black" />
                </div>

                <button className={`px-10 py-3 font-semibold text-white rounded-md transition cursor-pointer ${  loading ? "bg-gray-400" : "bg-black hover:bg-gray-900"}`}>
                    {loading ? "Uploading...":"Upload Product"}
                </button>

        </form>

      </div>
      
    </div>
  )
}

export default AdminProduct
