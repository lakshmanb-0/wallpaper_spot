'use client'
import { Input } from '@nextui-org/react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

const Search = () => {
    const router = useRouter()
    const pathName = usePathname()
    return (
        <Input placeholder="Search an Image" className='w-full' defaultValue={pathName.includes('search') ? pathName.split('/')[2] : ''}
            onKeyDown={(e: any) => e.key == 'Enter' && router.push(e.target.value != '' ? `/search/${e.target.value}` : '')} />
    )
}
export default Search