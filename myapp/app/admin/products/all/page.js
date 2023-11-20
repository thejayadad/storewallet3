'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import Link from "next/link"

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the database (replace 'http://localhost:3000' with your API endpoint)
    axios.get('http://localhost:3000/api/product')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <section className="lg:col-span-7 p-4">
      <h2 className="text-2xl font-bold text-center mb-6">All Products</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded">
          <thead>
            <tr>
              <th className="border p-3">Image</th>
              <th className="border p-3">Title</th>
              <th className="border p-3">Description</th>
              <th className="border p-3">Price</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className="border p-3">
                  <img
                    src={product.images[0]} // Assuming the first image is the main image
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="border p-3">{product.title}</td>
                <td className="border p-3">{product.desc}</td>
                <td className="border p-3">${product.price}</td>
                <td className="border p-3">
                  <div className="flex space-x-2">
                    <Link href={`/admin/products/${product._id}`}>Update</Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AllProducts;
