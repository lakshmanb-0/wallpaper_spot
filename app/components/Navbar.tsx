'use client'
import React from 'react'
import Search from './Search'
import { useRouter } from 'next/navigation'

const Navbar = () => {
    const router = useRouter()
    return (
        <header className="flex p-3 gap-4 items-center max-width">
            <h1 className="font-bold text-xl sm:text-3xl whitespace-nowrap cursor-pointer select-none" onClick={() => router.push('/')}>WallPaper Spot</h1>
            <Search />
        </header>
    )
}

export default Navbar