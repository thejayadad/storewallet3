'use client'
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import {useRouter} from "next/navigation";
import Link from 'next/link'


const Navbar = () => {
    const { data: session } = useSession();
    const router = useRouter();
    async function logout() {
        router.push('/');
        await signOut();
      }
    if (!session) {
        return (
          <div className="bg-gray-800 z-[40]  flex items-center">
            <div className="text-center w-full">
              <button onClick={() => signIn()} className="bg-white p-2 px-4 rounded-lg">Login with Google</button>
            </div>
          </div>
        );
      }
  return (
    <header className='px-4 py-12'>
        <div className='flex justify-between max-w-screen-2xl mx-auto'>
            <span>
                Logo
            </span>
            <div className='flex gap-4'>
                    {session?.user?.email === 'thejayadad@gmail.com' || 'jaydunb12@gmail.com' && (
                    <Link href="/admin">
                    <span className="text-blue-500">Admin</span>
                    </Link>
                )}
                <span>{session?.user?.email}</span>
                <button onClick={logout}>LogOut</button>
            </div>
        </div>
    </header>
  )
}

export default Navbar