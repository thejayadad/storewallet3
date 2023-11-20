'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineFileImage } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import Link from "next/link"

const NewProduct = () => {
  const CLOUD_NAME = 'socialsite';
  const UPLOAD_PRESET = 'marketsite';
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [photo, setPhoto] = useState(null); // Use null instead of an empty string
  const [previewUrl, setPreviewUrl] = useState(''); // New state for preview
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imageUrl = await uploadImage();

      const response = await fetch(`http://localhost:3000/api/product`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, desc, imageUrl, price }),
      });

      if (!response.ok) {
        throw new Error('Error submitting product');
      }

      router.push('/admin');
    } catch (error) {
      console.error(error);
      toast.error('Error submitting product');
    }
  };

  const uploadImage = async () => {
    if (!photo) return;

    const formData = new FormData();
    formData.append('file', photo);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );

      return response.data.secure_url;
    } catch (error) {
      console.error(error);
      toast.error('Error uploading image');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPhoto(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="grid md:col-span-7 lg:col-span-5">
           <div className='flex justify-around max-w-5xl mx-auto'>
            <Link href='/admin/products/new'>New Products</Link>
            <Link href='/admin/products/all'>All Products</Link>
        </div>
      <h2 className="text-center text-2xl font-bold mb-6">New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="desc" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="desc"
            name="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Upload Image <AiOutlineFileImage />
          </label>
          <input
            id="image"
            type="file"
            onChange={handleImageChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {previewUrl && (
            <div className="mt-2">
              <img
                src={previewUrl}
                alt="Image Preview"
                className="w-24 h-40 object-cover rounded-md"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-gray-500 text-white py-2 rounded hover:bg-gray-700 transition duration-300 w-full"
        >
          Create
        </button>
      </form>
      <ToastContainer />
    </section>
  );
};

export default NewProduct;
