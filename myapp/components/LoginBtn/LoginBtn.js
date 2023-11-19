'use client'
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"


const LoginBtn = () => {
  return (
    <>
    <div className='bg-gray-700 w-screen h-screen flex items-center'>
    <div className="text-center w-full">
            <button onClick={() => signIn('google')}>Login With Google</button>
        </div>
    </div>
    </>
  )
}

export default LoginBtn