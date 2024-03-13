'use client'
import { Input } from '@nextui-org/react'
import React from 'react'

type TSearchProps = {
    handleSearchValue: (e: string) => void
}
const Search = ({ handleSearchValue }: TSearchProps) => {
    return (
        <Input placeholder="Search an Image" className='w-full' onKeyDown={(e: any) => e.key == 'Enter' && handleSearchValue(e?.target?.value)} />
    )
}
export default Search