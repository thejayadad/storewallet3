'use client'
import React, {useEffect, useState} from 'react'
import axios from 'axios'

const Stats = () => {
    const [stats, setStats] = useState(null);
    useEffect(() => {
        axios.get("/api/stats").then((response) => {
            setStats(response.data)
        })
    }, [])
    if(!stats){
        return <div className='text-center'>Loading Stats....</div>
    }
  return (
    <section className='px-8 max-w-screen-xl mx-auto'>
        <div className='grid grid-cols-8 gap-6'>
            <div className='col-span-4 bg-purple-300'>
               <div className='flex flex-col'>
               <p className='text-center'>Total Products</p>
                <span className='text-center'>{stats.productCount}</span>
               </div>
            </div>
            <div className='col-span-4 bg-orange-200'>
                stats
            </div>
        </div>
    </section>
  )
}

export default Stats