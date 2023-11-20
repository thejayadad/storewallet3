'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

const SingleProduct = (ctx) => {
  const router = useRouter();
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/product/${ctx.params.id}`);
        setProductDetails(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [ctx.params.id]);

  const handleEdit = () => {
    router.push(`/admin/products/${ctx.params.id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/product/${ctx.params.id}`);
      router.push('/admin/');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <section className="lg:col-span-7 p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Single Product</h2>
      {productDetails && (
        <table className="min-w-full border rounded">
          <thead>
            <tr>
              <th className="border p-3">Title</th>
              <th className="border p-3">Description</th>
              <th className="border p-3">Price</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className='text-center' key={productDetails._id}>
              <td className="border p-3">{productDetails.title}</td>
              <td className="border p-3">{productDetails.desc}</td>
              <td className="border p-3">${productDetails.price}</td>
              <td className="border p-3">
                <div className="flex text-center space-x-2">
                  <button
                    onClick={handleEdit}
                    className="text-blue-500 cursor-pointer focus:outline-none"
                  >
                    <AiOutlineEdit />
                  </button>
                  <button
                    onClick={handleDelete}
                    className="text-red-500 cursor-pointer focus:outline-none"
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </section>
  );
};

export default SingleProduct;
