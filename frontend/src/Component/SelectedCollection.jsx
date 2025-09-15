import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SelectedCollection = ({ category }) => {
  const [items, setItems] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const res = await axios.get(`http://localhost:3100/api/selected-collection/${category}`)
        setItems(res.data?.items || [])
      } catch (error) {
        console.error(error)
      }
    };
    fetchCollection()
  }, [category])

  

  return (
    <div className="flex flex-col px-4 md:py-3 lg:py-8 max-w-[1400px] mx-auto">
      <h5 className="uppercase text-2xl font-medium md:mb-4 lg:mb-7">Selected collections</h5>

      {/* 4 images grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {items.map((item, index) => (
          <div key={index} className="" onClick={() => navigate(`/${category}/${item.subCategory}`)}>
            <img src={`http://localhost:3100${item.image}`} className="w-full h-auto object-cover cursor-pointer" />
            {/* images names */}
            <p className="pt-4 text-2xl  uppercase cursor-pointer">
              {item.name}
            </p>
             {/* Explore */}
      <h3 className="pt-1 pb-10 text-2xl   uppercase cursor-pointer">Explore</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedCollection;
