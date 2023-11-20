'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const EditProduct = (ctx) => {
  const CLOUD_NAME = 'socialsite';
  const UPLOAD_PRESET = 'marketsite';
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [photo, setPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/product/${ctx.params.id}`);
        const product = response.data;

        setTitle(product.title);
        setDesc(product.desc);
        setPrice(product.price);
        setPreviewUrl(product.images ? product.images[0] : '');
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [ctx.params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let images = null;
      if (photo) {
        images = await uploadImage();
      }

      const body = {
        title,
        desc,
        price,
      };

      if (images !== null) {
        body.images = images;
      }

      const response = await fetch(`http://localhost:3000/api/product/${ctx.params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, desc, images, price }),
      });
      console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error('Error has occurred');
      }

      const updatedProduct = await response.json();

      router.push(`/admin`);
    } catch (error) {
      console.error(error);
    }
  };

  const uploadImage = async () => {
    if (!photo) return;

    const formData = new FormData();

    formData.append('file', photo);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      const images = data['secure_url'];

      return images;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="lg:col-span-7 p-4">
      <h2 className="text-center text-2xl font-semibold mb-6">Update Product</h2>
      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="desc" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Current Image
          </label>
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Product Preview"
              className="w-24 h-24 object-cover mt-2 rounded-md border border-gray-300"
            />
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="newImage" className="block text-sm font-medium text-gray-700">
            Upload New Image
          </label>
          <input
            type="file"
            id="newImage"
            onChange={(e) => {
              setPhoto(e.target.files[0]);
              setPreviewUrl(URL.createObjectURL(e.target.files[0]));
            }}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-300"
        >
          Update
        </button>
      </form>
    </section>
  );
};

export default EditProduct;
