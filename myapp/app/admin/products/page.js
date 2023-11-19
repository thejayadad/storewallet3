'use client'
import React from 'react'
import Link from "next/link"

const Products = () => {
  return (
    <section>
        <div className='flex justify-around w-[1200px]'>
            <Link href='/admin/products/new'>New Products</Link>
            <Link href='/admin/products/all'>All Products</Link>
        </div>
    </section>
  )
}

export default Products