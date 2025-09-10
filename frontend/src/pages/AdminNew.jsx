import axios from "axios";
import React, { useState } from "react";
import upload from "../assets/upload_area.png";

const AdminNew = () => {
  const [images, setImages] = useState(Array(12).fill(null));
  const [preview, setPreview] = useState(Array(12).fill(null));
  const [category, setCategory] = useState("women");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Handle file selection
  const handleFile = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);

    const newPreview = [...preview];
    newPreview[index] = URL.createObjectURL(file);
    setPreview(newPreview);
  };

  // Remove image
  const handleRemove = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);

    const newPreview = [...preview];
    newPreview[index] = null;
    setPreview(newPreview);
  };

  // Upload all 12
  const handleUpload = async () => {
    if (images.some((img) => img === null)) {
      setMessage({ type: "error", text: "Please upload all 12 images" });
      return;
    }

    const formData = new FormData();
    images.forEach((img) => formData.append("images", img));
    formData.append("category", category);

    try {
      setLoading(true);
      setProgress(0);

      await axios.post("http://localhost:3100/api/new-collection/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / e.total);
          setProgress(percent);
        },
      });

      setMessage({ type: "success", text: "Images uploaded successfully!" });
      setImages(Array(12).fill(null));
      setPreview(Array(12).fill(null));
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "Upload failed. Please try again." });
    } finally {
      setLoading(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  return (
    <div className="bg-gray-50  py-8 px-6">
      <div className="max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Collection</h1>
        <p className="text-gray-600 mb-8">
          Upload <span className="font-medium">12 product images</span> for each category.
        </p>

        {/* Feedback */}
        {message.text && (
          <div
            className={`mb-6 p-4 rounded-lg shadow-md text-sm font-medium animate-fadeIn ${
              message.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Category selector */}
        <div className="mb-10">
          <label className="block mb-2 text-gray-700 font-semibold">Select Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-64 px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
          >
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kids</option>
          </select>
        </div>

        {/* Upload grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center bg-white border border-gray-200 rounded-xl shadow-sm p-4 hover:shadow-lg transition group"
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFile(e, index)}
                className="hidden"
                id={`file-${index}`}
              />
              <label
                htmlFor={`file-${index}`}
                className="w-32 h-32 rounded-lg border border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-black transition overflow-hidden"
              >
                {preview[index] ? (
                  <img
                    src={preview[index]}
                    alt={`preview-${index}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <img src={upload} alt="upload" className="w-10 opacity-60" />
                )}
              </label>

              {preview[index] && (
                <button
                  onClick={() => handleRemove(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition"
                >
                  X
                </button>
              )}

              <p className="mt-2 text-xs text-gray-500">Image {index + 1}</p>
            </div>
          ))}
        </div>

        {/* Upload button */}
        <div className="space-y-4">
          <button
            onClick={handleUpload}
            disabled={loading}
            className={`w-full sm:w-auto px-10 py-3 font-semibold text-white rounded-lg shadow-md transition 
            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-black to-gray-800 hover:opacity-90"}`}
          >
            {loading ? "Uploading..." : "Upload All Images"}
          </button>

          {/* Progress bar */}
          {loading && (
            <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
              <div
                className="bg-black h-3 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminNew;
