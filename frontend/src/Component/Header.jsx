import React, { useEffect, useState } from "react";
import axios from "axios";

const Header = ({ category }) => {
  const [heroImages, setHeroImages] = useState({
    women: [],
    men: [],
    kid: []
  });

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get("http://localhost:3100/api/header"); 
        // res.data = [{ category:"women", images:["/uploads/women/hero1.jpg", ...]}, ...]
        console.log(res)

       const grouped = {};
res.data.forEach(item => {
  grouped[item.category] = item.images.map(img => `http://localhost:3100${img}`);
});

        setHeroImages(grouped);
      } catch (err) {
        console.error("Error fetching images:", err);
      }
    };

    fetchImages();
  }, []);

  const text = {
    women: "NEW ARRIVALS",
    men: "ALTIER DROP 1",
    kid: "BACK TO SCHOOL"
  };
  const text_left = {
    women: "PASTEL EDIT",
    men: "UTILITARIAN PREP",
    kid: "BACK TO SCHOOL"
  };
  const text_right = {
    women: "SPARKLING DETAILS",
    men: "DENIM EDIT",
    kid: "NEW ARRIVALS"
  };
  const botton_text = {
    women: "SHOP NOW",
    men: "SHOW NOW",
    kid: "SHOP 2-8 Y"
  };
  const botton = {
    women: "SHOP NOW",
    men: "SHOP NOW",
    kid: "SHOP NOW"
  };

  return (
    <div>
      {/* top image */}
      <div className="relative">
        <img src={heroImages[category]?.[0]} alt="" />
        <div className="absolute bottom-4 left-3 right-3 flex flex-row items-center justify-between text-white text-center">
          <h1 className="text-6xl font-bold">{text[category]}</h1>
          <button className="mt-4 px-3 py-2 bg-white text-black text-2xl font-light cursor-pointer">
            {botton_text[category]}
          </button>
        </div>
      </div>

      {/* bottom images */}
      <div className="flex">
        <div className="w-full">
          <img className="w-full" src={heroImages[category]?.[1]} alt="" />

          <div className="flex flex-row justify-between m-4 cursor-pointer text-2xl">
            <h1>{text_left[category]}</h1>
            <button className="underline">{botton[category]}</button>
          </div>
        </div>

        <div className="w-full">
          <img className="w-full" src={heroImages[category]?.[2]} alt="" />

          <div className="flex flex-row justify-between m-4 cursor-pointer text-2xl">
            <h1>{text_right[category]}</h1>
            <button className="underline">{botton[category]}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
