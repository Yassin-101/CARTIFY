import axios from "axios";
import { ListFilter, Plus } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const ShopProduct = () => {
  const { category, subCategory } = useParams();
  const [shopProduct, setProduct] = useState([]);
  const { currency } = useContext(ShopContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let products = [];
        if (subCategory) {
          // Fetch products for the specific subCategory
          const res = await axios.get(
            `http://localhost:3100/api/products/${category}/${subCategory}`
          );
          products = res.data.products || [];
        } else {
          // Fetch all selected collection products
         const res = await axios.get("http://localhost:3100/api/products/selected-collection");

          // Filter by category
          products = res.data.products?.filter((p) => p.category === category) || [];
        }
        setProduct(products);
      } catch (error) {
        console.error(error);
        setProduct([]);
      }
    };
    fetchProduct();
  }, [category, subCategory]);

  return (
    <div className="">
      <h1 className="text-5xl font-semibold uppercase p-8">
        {subCategory || "Selected Collection"}
      </h1>

      <div className="uppercase text-2xl underline flex flex-row justify-between items-center ">
        <p className="flex pl-8 items-center mt-2 cursor-pointer">
          sort by<span className="pl-1 mt-1"><Plus size={30} /></span>
        </p>
        <p className="flex pr-8 items-center cursor-pointer">
          filter <span className="pl-3"><ListFilter size={19} /></span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 cursor-pointer py-6 px-6">
        {shopProduct.map((p) => {
  // decide which image to show
  const image =
    p.newCollection && p.images?.length > 1
      ? p.images[1] //  show 2nd image for new collection
      : p.images?.[0]; //  otherwise show 1st image (selected collection)

  const productId = p._id;
  const name = p.name;
  const price = p.price;

  return (
    <Link key={productId} to={`/product/${productId}`} className="group">
      <div className="border rounded-md overflow-hidden hover:shadow-lg transition">
        <img
          src={`http://localhost:3100${image}`}
          alt={name}
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg uppercase">{name}</h3>
          <p className="pt-1 font-bold text-lg">
            {currency}{price}
          </p>
        </div>
      </div>
    </Link>
  );
})}

      </div>

      {shopProduct.length === 0 && (
        <p className="mt-6 text-gray-500 text-center text-2xl">
          No items found for {category} {subCategory ? `in ${subCategory}` : ""}.
        </p>
      )}
    </div>
  );
};

export default ShopProduct;
