'use client'
import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = ({ mode = 'new' }) => {
  const CLOUD_NAME = 'socialsite';
  const UPLOAD_PRESET = 'marketsite';
  const [product, setProduct] = useState({
    title: '',
    desc: '',
    price: '',
    images: [],
    category: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageNames = files.map((file) => file.name);
    setProduct((prevProduct) => ({ ...prevProduct, images: files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imageUrls = await Promise.all(
        product.images.map(async (image) => {
          const formData = new FormData();
          formData.append('file', image);
          formData.append('upload_preset', UPLOAD_PRESET);

          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            formData
          );

          return response.data.secure_url;
        })
      );

      await axios.post('/api/categories', { name: product.category });


      if (mode === 'new') {
        await axios.post('/api/product', {
          ...product,
          images: imageUrls,
        });
      } else {
        // Update an existing product (you need to provide the product ID)
        await axios.put(`/api/product/${id}`, {
          ...product,
          images: imageUrls,
        });
      }

      // Clear form after submission
      setProduct({
        title: '',
        desc: '',
        price: '',
        images: [],
        category: '',
      });
    } catch (error) {
      console.error('Error submitting product:', error);
    }
  };

  return (
    <section className="grid md:col-span-7 lg:col-span-7">
      <h2 className="text-2xl font-bold text-center mb-6">
        {mode === 'new' ? 'New Product' : 'Edit Product'}
      </h2>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label className="mb-2 text-gray-700" htmlFor="title">
          Product Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={product.title}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded mb-4"
          required
        />

        <label className="mb-2 text-gray-700" htmlFor="description">
          Product Description
        </label>
        <textarea
          id="desc"
          name="desc"
          value={product.desc}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded mb-4"
          required
        ></textarea>

        <label className="mb-2 text-gray-700" htmlFor="price">
          Product Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={product.price}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded mb-4"
          required
        />

        <label className="mb-2 text-gray-700" htmlFor="images">
          Product Images
        </label>
        <input
          type="file"
          id="images"
          name="images"
          onChange={handleImageChange}
          className="p-2 border border-gray-300 rounded mb-4"
          multiple
          accept="image/*"
        />
        {product.images.length > 0 && (
          <div className="mb-4">
            <strong>Selected Images:</strong>
            <ul>
              {product.images.map((image, index) => (
                <li key={index}>
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Product Image ${index + 1}`}
                    className="w-16 h-16 object-cover mr-2 mb-2 rounded"
                  />
                </li>
              ))}
            </ul>
          </div>
        )}

        <label className="mb-2 text-gray-700" htmlFor="category">
          Product Category
        </label>
        <input
          type="text"
          id="category"
          name="category"
          value={product.category}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded mb-4"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          {mode === 'new' ? 'Add Product' : 'Update Product'}
        </button>
      </form>
    </section>
  );
};

export default ProductForm;
