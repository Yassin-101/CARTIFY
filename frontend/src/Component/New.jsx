import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const New = ({ category }) => { // category passed as prop
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchNewCollection = async () => {
      try {
        const res = await axios.get("http://localhost:3100/api/products/new-collection");
        // filter by category
        const filtered = res.data.products?.filter((p) => p.category === category) || [];
        setProducts(filtered);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNewCollection();
  }, [category]);

  return (
    <div className="">
      <div className="text-left py-8 px-5 mt-10 text-xl flex flex-row justify-between">
        <p className="text-2xl">NEW IN</p>
        <p className="underline cursor-pointer uppercase">View All</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
        {products.map((p) => (
          <Link key={p._id} to={`/product/${p._id}`}>
            <img
              src={`http://localhost:3100${p.images?.[0]}`}
              alt={p.name}
              className="w-full h-auto object-cover cursor-pointer"
            />
          </Link>
        ))}
      </div>

      {products.length === 0 && (
        <p className="mt-6 text-gray-500 text-xl">No products in new collection.</p>
      )}
    </div>
  );
};

export default New;
