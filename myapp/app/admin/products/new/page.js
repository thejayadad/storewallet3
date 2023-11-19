'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineFileImage } from 'react-icons/ai';
import { useRouter } from 'next/navigation';

const NewProduct = () => {
  const CLOUD_NAME = 'socialsite';
  const UPLOAD_PRESET = 'marketsite';
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
//   const [category, setCategory] = useState('');
  const [photo, setPhoto] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const images = await uploadImage();

      const response = await fetch(`http://localhost:3000/api/product`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ title, desc,  images, price })
    })
    const product = await response.json()

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

  return (
    <section className="grid md:col-span-7 lg:col-span-5">
      <h2 className="text-center">New Product</h2>
      <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Title...' onChange={(e) => setTitle(e.target.value)} />
                    <textarea placeholder='Description...' onChange={(e) => setDesc(e.target.value)} />
                    {/* <input type="text" placeholder='Category...' onChange={(e) => setCategory(e.target.value)} /> */}
                    <input type="number" placeholder='Price...' onChange={(e) => setPrice(e.target.value)} />
                    <label htmlFor='image'>
                        Upload Image <AiOutlineFileImage />
                    </label>
                    <input id='image' type="file" style={{ display: 'none' }} onChange={(e) => setPhoto(e.target.files[0])} />
                    <button>Create</button>
                </form>
        <ToastContainer />
    </section>
  );
};

export default NewProduct;
