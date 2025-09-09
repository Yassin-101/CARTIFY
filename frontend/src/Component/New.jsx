import React, { useEffect, useState } from 'react'

const New = ({category}) => {
  const [latest,setLatest] = useState({
    women:[],
    men:[],
    kid:[]
  })
  useEffect(()=>{
    const fetchNew = async()=>{
      try {
        
      } catch (error) {
        
      }
    }
  },[])
  return (
    <div>
      <div className='text-left py-8 px-5 text-xl flex flex-row justify-between '>
        <p className='text-2xl'>NEW IN</p>
        <p className='underline cursor-pointer uppercase'>View All</p>
      </div>
      {/* All 12 images */}
      <div className='grid grid-cols-2 md:grid-cols-6'>
        
      </div>
    </div>
  )
}

export default New
