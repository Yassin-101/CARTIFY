import axios from "axios";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import uploadImg from "../assets/upload_area.png";

const AdminProduct = () => {
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("women");
  const [subCategory, setSubCategory] = useState("");
  const [productType, setProductType] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [articleNumber, setArticleNumber] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [garmentLength, setGarmentLength] = useState("");
  const [newCollection, setNewCollection] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(false);
  const [description, setDescription] = useState("");
  const [sleeveLength, setSleeveLength] = useState("");

  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  // Clean up object URLs
  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const handleImage = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = [...images, ...files].slice(0, 4);

    previews.forEach((url) => URL.revokeObjectURL(url));
    setImages(newFiles);
    setPreviews(newFiles.map((f) => URL.createObjectURL(f)));
  };

  const removeImage = (index) => {
    const updatedImages = [...images];
    const updatedPreviews = [...previews];
    updatedImages.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setImages(updatedImages);
    setPreviews(updatedPreviews);
  };

  const resetForm = () => {
    setImages([]);
    setPreviews([]);
    setName("");
    setPrice("");
    setSubCategory("");
    setCategory("women");
    setProductType("");
    setColor("");
    setSize("");
    setArticleNumber("");
    setAgeGroup("");
    setGarmentLength("");
    setNewCollection(false);
    setSelectedCollection(false);
    setDescription("");
    setSleeveLength("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !subCategory || images.length === 0) {
      setMessage({
        type: "error",
        text: "Please fill required fields and upload images.",
      });
      return;
    }

    if (!newCollection && !selectedCollection) {
      setMessage({
        type: "error",
        text: "Please select a collection type.",
      });
      return;
    }

    const formData = new FormData();
    images.forEach((img) => formData.append("images", img));

    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("productType", productType);
    formData.append("colors", JSON.stringify(color.split(",").map((c) => c.trim())));
    formData.append("sizes", JSON.stringify(size.split(",").map((s) => s.trim())));
    formData.append("articleNumber", articleNumber);
    formData.append("ageGroup", ageGroup);
    formData.append("garmentLength", garmentLength);
    formData.append("newCollection", newCollection ? "true" : "false");
    formData.append("selectedCollection", selectedCollection ? "true" : "false");
    formData.append("description", description);
    formData.append("sleeveLength", sleeveLength);

    try {
      setLoading(true);

      if (newCollection) {
        await axios.post("http://localhost:3100/api/products/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else if (selectedCollection) {
        await axios.post("http://localhost:3100/api/products/selected-collection", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setMessage({ type: "success", text: "Product uploaded successfully" });
      resetForm();
    } catch (error) {
      console.error("Upload error:", error.response || error.message);
      setMessage({ type: "error", text: "Upload failed. Check console." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 py-10 px-6">
      <div className="max-w-5xl">
        <h1 className="text-2xl font-bold mb-2">Product Upload</h1>
        <p className="">Upload up to 4 images and fill in product details </p>

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

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* collection type */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={newCollection}
                onChange={() => setNewCollection(!newCollection)}
              />
              New Collection
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedCollection}
                onChange={() => setSelectedCollection(!selectedCollection)}
              />
              Selected Collection
            </label>
          </div>

          {/* image upload */}
          {(newCollection || selectedCollection) && (
            <div>
              <label className="block mb-2 font-medium">Upload Images (MAX 4)</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="relative flex flex-col items-center">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id={`upload-${i}`}
                      onChange={handleImage}
                      multiple
                    />
                    <label
                      htmlFor={`upload-${i}`}
                      className="w-full h-42 flex items-center justify-center cursor-pointer border border-gray-300 rounded-lg overflow-hidden bg-white object-cover"
                    >
                      {previews[i] ? (
                        <img src={previews[i]} className="w-full h-auto object-cover" />
                      ) : (
                        <img src={uploadImg} className="w-10 opacity-50" />
                      )}
                    </label>
                    {previews[i] && (
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border-b focus:border-black"
            />
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border-b focus:border-black"
            />
            <input
              type="text"
              placeholder="Subcategory "
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="w-full p-2 border-b focus:border-black"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border-b focus:border-black"
            >
              <option value="women">Women</option>
              <option value="men">Men</option>
              <option value="kid">Kids</option>
            </select>
            <input
              type="text"
              placeholder="Product Type"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              className="w-full p-2 border-b focus:border-black"
            />
            <input
              type="text"
              placeholder="Sleeve Length"
              value={sleeveLength}
              onChange={(e) => setSleeveLength(e.target.value)}
              className="w-full p-2 border-b focus:border-black"
            />
            <input
              type="text"
              placeholder="Colors (comma separated)"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full p-2 border-b focus:border-black"
            />
            <input
              type="text"
              placeholder="Sizes (comma separated)"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full p-2 border-b focus:border-black"
            />
            <input
              type="text"
              placeholder="Article Number"
              value={articleNumber}
              onChange={(e) => setArticleNumber(e.target.value)}
              className="w-full p-2 border-b focus:border-black"
            />
            <input
              type="text"
              placeholder="Age Group"
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value)}
              className="w-full p-2 border-b focus:border-black"
            />
            <input
              type="text"
              placeholder="Garment Length"
              value={garmentLength}
              onChange={(e) => setGarmentLength(e.target.value)}
              className="w-full p-2 border-b focus:border-black"
            />
            <textarea
              placeholder="Product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border-b focus:border-black col-span-2"
            />
          </div>

          <button
            className={`px-10 py-3 font-semibold text-white rounded-md transition cursor-pointer ${
              loading ? "bg-gray-400" : "bg-black hover:bg-gray-900"
            }`}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProduct;
