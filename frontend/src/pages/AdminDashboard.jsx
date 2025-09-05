import React, { useState } from 'react';
import axios from 'axios';

const AdminHeaderUpload = () => {
  const [category, setCategory] = useState('women');
  const [images, setImages] = useState([null, null, null]); // 3 slots
  const [preview, setPreview] = useState([null, null, null]);

  // Handle file selection for a specific slot
  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);

    const newPreviews = [...preview];
    newPreviews[index] = URL.createObjectURL(file);
    setPreview(newPreviews);
  };

  // Upload images
  const handleUpload = async () => {
    if (images.some(img => img === null)) {
      return alert('Please upload all 3 images for this category!');
    }

    const formData = new FormData();
    images.forEach(img => formData.append('images', img));
    formData.append('category', category);

    try {
      const res = await axios.post('http://localhost:3100/api/header/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Images uploaded successfully!');
      console.log(res.data);
      setImages([null, null, null]);
      setPreview([null, null, null]);
    } catch (err) {
      console.error(err);
      alert('Upload failed!');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Admin Header Image Upload</h1>

      {/* Category Selector */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Select Category:</label>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="border p-2"
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kids</option>
        </select>
      </div>

      {/* File Inputs */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {['Top Image', 'Bottom Left', 'Bottom Right'].map((label, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <label className="mb-2 font-medium">{label}</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, idx)}
            />
            {preview[idx] && (
              <img
                src={preview[idx]}
                alt="preview"
                className="w-32 h-32 object-cover border mt-2"
              />
            )}
          </div>
        ))}
      </div>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
      >
        Upload 3 Images
      </button>
    </div>
  );
};

export default AdminHeaderUpload;
