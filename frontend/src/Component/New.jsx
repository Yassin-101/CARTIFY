import React, { useEffect, useState } from 'react'
import axios from 'axios'

const New = ({category}) => {
  const [latest,setLatest] = useState({
    women:[],
    men:[],
    kid:[]
  })
  useEffect(()=>{
    const fetchNew = async()=>{
      try {
      const res = await fetch("http://localhost:3100/api/new-collection"); 
        const data = await res.json();
        console.log("New Collection API:", data);

        // this will trasform the backend array into object of keys
        const transform = {
          women: data.find((c)=> c.category === "women")?.images || [],
          men : data.find((c)=>c.category === "men")?.images || [],
          kid : data.find((c)=>c.category === "kid")?.images || [],
        }
        setLatest(transform)
      } catch (error) {
        console.error("Error fetching new collection:", error)
      }
    }
    fetchNew()
  },[])
  return (
    <div>
      <div className='text-left py-8 px-5 text-xl flex flex-row justify-between '>
        <p className='text-2xl'>NEW IN</p>
        <p className='underline cursor-pointer uppercase'>View All</p>
      </div>
      {/* All 12 images */}
      <div className='grid grid-cols-2 md:grid-cols-6'>
       {
        latest[category]?.map((img,index)=>{
          return <div className='w-full' key={index}>
            <img src={`http://localhost:3100${img}`} alt="" className='w-full h-auto object-cover cursor-pointer'/>
          </div>
        })
       }
      </div>
    </div>
  )
}

export default New
