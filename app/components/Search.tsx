'use client'
import { Input } from '@nextui-org/react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

const Search = () => {
    const router = useRouter()
    const pathName = usePathname()

    const handleInputChange = (e: any) => {
        if (e.key === 'Enter' && e.target.value != '') {
            router.push(`/search/${e.target.value}`)
        }
    }
    return (
        <Input placeholder="Search an Image" className='w-full'
            defaultValue={pathName.includes('search') ? pathName.split('/')[2]?.replaceAll('%20', ' ') : ''}
            onKeyDown={handleInputChange} />
    )
}
export default Search